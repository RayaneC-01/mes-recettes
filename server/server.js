// 1. Importation des dépendances
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authRoutes = require('./routes/auth'); // Routes pour login / register
const recipeRoutes = require('./routes/recipes'); // Routes pour CRUD des recettes 

// 2. INITIALISATION DE L'APPLICATION
const app = express(); // Crée l'application serveur Express


// 3. MIDDLEWARES
app.use(cors()); // Autorise les requêtes provenant d'un autre domaine (comme GitHub Pages ou React local)
app.use(express.json()); // Indique à Express de traduire automatiquement le JSON reçu dans req.body



// 4. CONNEXION À LA BASE DE DONNÉES (MONGODB)
// Se connecte à MongoDB en utilisant l'adresse sécurisée stockée dans le .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connexion à MongoDB réussie !'))
  .catch((err) => console.error('❌ Erreur de connexion à MongoDB :', err));


// 5. DÉFINITION DES ROUTES DE L'API
app.use('/api/auth', authRoutes); // Redirige les URL commençant par /api/auth vers le fichier auth.js
app.use('/api/recipes', recipeRoutes); // Redirige les URL commençant par /api/recipes vers le fichier recipes.js

// Route de test simple pour vérifier que le serveur répond sur le navigateur
app.get('/', (req, res) => {
  res.send('Le serveur de MesRecettes tourne correctement.');
});

// 6. Lancement du serveur Express sur le port configuré
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur : http://localhost:${PORT}`);
});