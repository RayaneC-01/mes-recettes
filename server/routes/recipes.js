const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

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
router.post("/", async (req, res) => {
  try {
    const { title, category, prepTime, ingredients, instructions, image, author } = req.body;

    if (!title || !category || !prepTime || !ingredients || !instructions) {
      return res.status(400).json({ message: "Tous les champs requis doivent être remplis." });
    }

    if (!author) {
      return res.status(400).json({ message: "Auteur non spécifié." });
    }

    const newRecipe = await Recipe.create({
      title,
      category,
      prepTime,
      ingredients,
      instructions,
      image,
      author // Récupère l'ID envoyé par le frontend
    });

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
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette introuvable !" });

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
router.delete("/:id", async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: "Recette introuvable !" });

    await Recipe.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Recette supprimée avec succès." });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la recette." });
  }
});

module.exports = router;