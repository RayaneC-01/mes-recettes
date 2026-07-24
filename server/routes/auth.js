// ==========================================
// 1. IMPORTS ET CONFIGURATION
// ==========================================
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// ==========================================
// 2. ROUTE D'INSCRIPTION : POST /register
// ==========================================
// Cette route est appelée sur http://localhost:5000/api/auth/register 
router.post('/register', async (req, res) => {
  try {
    // Récupération des données envoyées par le frontend 
    const { firstName, lastName, username, email, password, phone } = req.body;

    // 1. Vérification que tous les champs sont présents
    if (!firstName || !lastName || !username || !email || !password || !phone) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    // 2. Vérification du format de l'email via une Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "L'email n'est pas valide" });
    }

    // 3. Vérification de l'unicité de l'email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Cet email est déjà utilisé" });
    }

    // 4. Vérification de l'unicité du nom d'utilisateur (username)
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Ce nom d'utilisateur est déjà utilisé" });
    }

    // 5. Validation de la longueur du mot de passe
    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({ message: "Le mot de passe doit contenir entre 6 et 20 caractères" });
    }

    // 6. Création de l'utilisateur dans MongoDB
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password: password, // Le mot de passe sera haché automatiquement grâce au middleware dans le modèle User
      phone
    });

    // 7. Envoi de la réponse SANS le mot de passe pour la sécurité
    const { _id, createdAt } = newUser;
    return res.status(201).json({ _id, firstName, lastName, username, email, phone, createdAt });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de l'inscription" });
  }
});

// ==========================================
// 3. ROUTE DE CONNEXION : POST /login
// ==========================================
// Appelée sur : POST http://localhost:5000/api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Vérification de la présence des identifiants
    if (!email || !password) {
      return res.status(400).json({ message: "L'email et le mot de passe sont obligatoires" });
    }

    // 2. Recherche de l'utilisateur par son Email (avec réintégration forcée du champ password)
    const user = await User.findOne({ email }).select('+password');

    // 3. Si l'email n'existe pas -> Réponse vague pour la sécurité
    if (!user) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // 4. Comparaison du mot de passe reçu avec le mot de passe haché en BDD via bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 5. Si le mot de passe est faux -> Même réponse vague pour ne rien révéler
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }

    // 6. Connexion réussie : renvoi des infos de l'utilisateur (sans le MDP)
    const { _id, firstName, lastName, username, phone, createdAt } = user;
    return res.status(200).json({ _id, firstName, lastName, username, email, phone, createdAt });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la connexion" });
  }
});

// ==========================================
// BONUS : OBTENIR TOUS LES UTILISATEURS (GET /)
// ==========================================
// Cette route est appelée sur http://localhost:5000/api/auth/users
router.get('/users', async (req, res) => {
  try {
    // Récupérer tous les utilisateurs mais SANS leur mot de passe pour la sécurité
    const users = await User.find().select('-password');
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la récupération des utilisateurs" });
  }
});

// ==========================================
// BONUS : SUPPRIMER UN UTILISATEUR (DELETE /:id)
// ==========================================
// Cette route est appelée sur http://localhost:5000/api/auth/user/:id
router.delete('/user/:id', async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur à supprimer depuis les paramètres de la requête  
    const userId = req.params.id;
    // Supprimer l'utilisateur de la base de données
    const deletedUser = await User.findByIdAndDelete(userId);
    // Si aucun utilisateur n'a été trouvé avec cet ID, renvoyer une erreur 404
    if (!deletedUser) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // Si l'utilisateur a été supprimé avec succès, renvoyer un message de confirmation
    return res.status(200).json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Une erreur est survenue lors de la suppression de l'utilisateur" });
  }
});

// 4. EXPORT DU ROUTER
module.exports = router;