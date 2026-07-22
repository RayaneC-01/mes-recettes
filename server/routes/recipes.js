const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("./auth"); // Ton middleware d'authentification

// ==========================================
// 1. LIRE TOUTES LES RECETTES (GET /)
// ==========================================
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author", "username email");
    res.status(200).json(recipes);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des recettes." });
  }
});

// ==========================================
// 2. LIRE UNE SEULE RECETTE (GET /:id)
// ==========================================
router.get("/:id", async (req, res) => {
  try {
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
router.post("/", auth, async (req, res) => {
  try {
    const { title, category, prepTime, ingredients, instructions, image } = req.body;

    if (!title || !category || !prepTime || !ingredients || !instructions) {
      return res.status(400).json({ message: "Tous les champs requis doivent être remplis." });
    }

    const newRecipe = await Recipe.create({
      title,
      category,
      prepTime,
      ingredients,
      instructions,
      image,
      author: req.user.id || req.user._id // Récupère automatiquement l'ID de l'utilisateur connecté
    });

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la recette." });
  }
});

// ==========================================
// 4. MODIFIER UNE RECETTE (PUT /:id)
// ==========================================
router.put("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette introuvable !" });

    // Vérification simple : L'utilisateur connecté doit être l'auteur
    const currentUserId = (req.user.id || req.user._id).toString();
    if (recipe.author.toString() !== currentUserId) {
      return res.status(403).json({ message: "Action non autorisée : Vous n'êtes pas l'auteur." });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
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
router.delete("/:id", auth, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette introuvable !" });

    // Vérification simple : L'utilisateur connecté doit être l'auteur
    const currentUserId = (req.user.id || req.user._id).toString();
    if (recipe.author.toString() !== currentUserId) {
      return res.status(403).json({ message: "Action non autorisée : Vous n'êtes pas l'auteur." });
    }

    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recette supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la recette." });
  }
});

module.exports = router;