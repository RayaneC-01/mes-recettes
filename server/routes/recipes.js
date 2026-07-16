// ==========================================
// IMPORTS
// ==========================================
const express = require("express");
const router = express.Router();
const Recipe = require("../models/Recipe");

// ==========================================
// 1. LIRE TOUTES LES RECETTES (GET /)
// ==========================================
// Appelée sur : GET http://localhost:5000/api/recipes
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
// 2. LIRE UNE SEULE RECETTE (GET /:id)
// ==========================================
// Appelée sur : GET http://localhost:5000/api/recipes/:id
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
// 3. CRÉER UNE NOUVELLE RECETTE (POST /)
// ==========================================
// Appelée sur : POST http://localhost:5000/api/recipes
router.post("/", async (req, res) => {
    try {
        const { title, description, ingredients, instructions, author } = req.body;
        
        // 1. Vérification que tous les champs sont présents
        if (!title || !description || !ingredients || !instructions || !author) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }
        
        // 2. Création de la recette
        const newRecipe = await Recipe.create({ title, description, ingredients, instructions, author });
        res.status(201).json(newRecipe);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la création de la recette" });
    }
});

// ==========================================
// 4. METTRE À JOUR UNE RECETTE (PUT /:id)
// ==========================================
// Appelée sur : PUT http://localhost:5000/api/recipes/:id
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, ingredients, instructions } = req.body;
        
        // 1. Vérification que tous les champs sont présents
        if (!title || !description || !ingredients || !instructions) {
            return res.status(400).json({ message: "Tous les champs sont obligatoires" });
        }
        
        // 2. Mise à jour de la recette
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, { title, description, ingredients, instructions }, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recette non trouvée !" });
        }
        res.status(200).json(updatedRecipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la mise à jour de la recette" });
    }
});

// ==========================================
// 5. SUPPRIMER UNE RECETTE (DELETE /:id)
// ==========================================
// Appelée sur : DELETE http://localhost:5000/api/recipes/:id
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedRecipe = await Recipe.findByIdAndDelete(id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recette non trouvée !" });
        }
        res.status(200).json({ message: "Recette supprimée avec succès" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Une erreur est survenue lors de la suppression de la recette" });
    }
});

module.exports = router;