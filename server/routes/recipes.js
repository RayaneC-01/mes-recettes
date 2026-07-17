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
        // 1. Récupérer uniquement les champs définis dans ton modèle
        const { title, category, prepTime, ingredients, instructions, image, author } = req.body;

        // 2. Vérifier que tous les champs obligatoires (selon ton modèle) sont présents
        if (!title || !category || !prepTime || !ingredients || !instructions || !author) {
            return res.status(400).json({ message: "Tous les champs obligatoires (title, category, prepTime, ingredients, instructions, author) doivent être remplis." });
        }

        // 3. Créer la recette
        const newRecipe = await Recipe.create({
            title,
            category,
            prepTime,
            ingredients,
            instructions,
            image, // Optionnel, s'il n'est pas envoyé, il sera absent/null
            author
        });

        res.status(201).json(newRecipe);

    } catch (error) {
        console.error(error);
        // Si l'erreur vient d'une mauvaise catégorie (ValidationError de Mongoose)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ message: error.message });
        }
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

        // On récupère tous les champs de la capture d'écran (image reste optionnelle selon ton modèle)
        const { title, category, prepTime, ingredients, instructions, image } = req.body;

        // 1. Vérification stricte : tous les champs requis doivent être présents
        if (!title || !category || !prepTime || !ingredients || !instructions) {
            return res.status(400).json({
                message: "Tous les champs (title, category, prepTime, ingredients, instructions) sont obligatoires pour la mise à jour."
            });
        }

        // 2. Mise à jour de la recette
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { title, category, prepTime, ingredients, instructions, image },
            { new: true, runValidators: true } // runValidators force la validation de l'enum de la catégorie
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recette non trouvée !" });
        }

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
// 4.1 (BONUS) MISE À JOUR PARTIELLE (PATCH /:id)
// ==========================================
// Appelée sur : PATCH http://localhost:5000/api/recipes/:id
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // On récupère le body directement. L'utilisateur n'envoie que ce qu'il veut modifier.
        const updates = req.body;

        // On met à jour uniquement les champs fournis dans req.body
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            id,
            { $set: updates }, // Le flag $set de MongoDB applique uniquement les champs présents
            { new: true, runValidators: true }
        );

        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recette non trouvée !" });
        }

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



// Export du router pour l'utiliser dans le serveur principal

module.exports = router;