const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// ==========================================
// 1. LIRE TOUTES LES RECETTES (GET /)
// ==========================================
router.get("/", async (req, res) => {
  try {
    // Utilisation de populate pour récupérer les informations de l'auteur (username et email) à partir de l'ID stocké dans le champ "author" de la recette.
    const recipes = await Recipe.find().populate("author", "username email");
    res.status(200).json(recipes);
  } catch (error) {
    // En cas d'erreur, on renvoie un message d'erreur générique
    res.status(500).json({ message: "Erreur lors de la récupération des recettes." });
  }
});

// ==========================================
// 2. LIRE UNE SEULE RECETTE (GET /:id)
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    // Utilisation de populate pour récupérer les informations de l'auteur (username et email) à partir de l'ID stocké dans le champ "author" de la recette.
    const recipe = await Recipe.findById(req.params.id).populate("author", "username email");
    if (!recipe) return res.status(404).json({ message: "Recette introuvable !" });

    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération de la recette." });
  }
});

// ==========================================
// 3. CRÉER UNE RECETTE (POST /)
// ==========================================
router.post("/", async (req, res) => {
  try {
    // Récupération des données de la recette depuis le corps de la requête
    const { title, category, prepTime, ingredients, instructions, image, author } = req.body;
    // Vérification que tous les champs requis sont présents
    if (!title || !category || !prepTime || !ingredients || !instructions) {
      return res.status(400).json({ message: "Tous les champs requis doivent être remplis." });
    }

    if (!author) {
      return res.status(400).json({ message: "Auteur non spécifié." });
    }
    // Création de la nouvelle recette dans la base de données
    const newRecipe = await Recipe.create({
      title,
      category,
      prepTime,
      ingredients,
      instructions,
      image,
      author // Récupère l'ID envoyé par le frontend
    });
    // Envoi de la réponse avec la nouvelle recette créée
    res.status(201).json(newRecipe);
  } catch (error) {
    console.error("❌ Erreur POST / :", error);
    res.status(500).json({ message: error.message || "Erreur lors de la création de la recette." });
  }
});

// ==========================================
// 4. MODIFIER UNE RECETTE (PUT /:id)
// ==========================================
router.put("/:id", async (req, res) => {
  try {
    // Vérification que la recette existe avant de tenter de la modifier
    const recipe = await Recipe.findById(req.params.id);
    // Si la recette n'existe pas, on renvoie une erreur 404
    if (!recipe) return res.status(404).json({ message: "Recette introuvable !" });

    // Mise à jour de la recette avec les nouvelles données envoyées dans le corps de la requête
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      // req.params.id est l'ID de la recette à modifier, req.body contient les nouvelles données, 
      // { new: true, runValidators: true } permet de renvoyer la recette mise à jour et de valider les données selon le schéma défini dans le modèle.
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification de la recette." });
  }
});

// ==========================================
// 5. SUPPRIMER UNE RECETTE (DELETE /:id)
// ==========================================
router.delete("/:id", async (req, res) => {
  try {
    // Vérification que la recette existe avant de tenter de la supprimer
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette introuvable !" });

    // Suppression de la recette de la base de données
    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recette supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la recette." });
  }
});

module.exports = router;