// ==========================================
// IMPORTS
// ==========================================
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");
const auth = require("./auth"); 

// ==========================================
// 1. LIRE TOUTES LES RECETTES (GET /) - Public
// ==========================================
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("author", "username email");
    res.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Une erreur est survenue lors de la récupération des recettes",
    });
  }
});

// ==========================================
// 2. LIRE UNE SEULE RECETTE (GET /:id) - Public
// ==========================================
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findById(id).populate("author", "username email");
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée !" });
    }
    res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la récupération de la recette" });
  }
});

// ==========================================
// 3. CRÉER UNE NOUVELLE RECETTE (POST /) - Protégé par auth
// ==========================================
router.post("/", auth, async (req, res) => {
  try {
    const { title, category, prepTime, ingredients, instructions, image } = req.body;

    if (!title || !category || !prepTime || !ingredients || !instructions) {
      return res.status(400).json({ 
        message: "Tous les champs obligatoires (title, category, prepTime, ingredients, instructions) doivent être remplis." 
      });
    }

    // L'auteur est automatiquement extrait du token grâce au middleware auth
    const author = req.user.id;

    const newRecipe = await Recipe.create({
      title,
      category,
      prepTime,
      ingredients,
      instructions,
      image,
      author
    });

    res.status(201).json(newRecipe);

  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Une erreur est survenue lors de la création de la recette" });
  }
});

// ==========================================
// 4. METTRE À JOUR UNE RECETTE (PUT /:id) - Protégé par auth + auteur
// ==========================================
router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, prepTime, ingredients, instructions, image } = req.body;

    if (!title || !category || !prepTime || !ingredients || !instructions) {
      return res.status(400).json({
        message: "Tous les champs (title, category, prepTime, ingredients, instructions) sont obligatoires pour la mise à jour."
      });
    }

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée !" });
    }

    // Vérification : L'utilisateur connecté est-il l'auteur ?
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée : Vous n'êtes pas l'auteur de cette recette." });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, category, prepTime, ingredients, instructions, image },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de la recette" });
  }
});

// ==========================================
// 4.1 MISE À JOUR PARTIELLE (PATCH /:id) - Protégé par auth + auteur
// ==========================================
router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée !" });
    }

    // Vérification : L'utilisateur connecté est-il l'auteur ?
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée : Vous n'êtes pas l'auteur de cette recette." });
    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    res.status(200).json(updatedRecipe);
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Une erreur est survenue lors de la modification partielle de la recette" });
  }
});

// ==========================================
// 5. SUPPRIMER UNE RECETTE (DELETE /:id) - Protégé par auth + auteur
// ==========================================
router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id);
    if (!recipe) {
      return res.status(404).json({ message: "Recette non trouvée !" });
    }

    // Vérification : L'utilisateur connecté est-il l'auteur ?
    if (recipe.author.toString() !== req.user.id) {
      return res.status(403).json({ message: "Action non autorisée : Vous n'êtes pas l'auteur de cette recette." });
    }

    await Recipe.findByIdAndDelete(id);
    res.status(200).json({ message: "Recette supprimée avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la recette" });
  }
});

module.exports = router;