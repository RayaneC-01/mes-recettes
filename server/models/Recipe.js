// 1. IMPORTS
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// 2. DÉFINITION DU SCHÉMA (STRUCTURE MONGODB)
const recipeSchema = new Schema({
  title: {
    type: String,
    required: [true, "Le titre de la recette est requis"],
  },
  category: {
    type: String,
    required: [true, "La catégorie de la recette est requise"],
    enum: ["Entrée", "Plat", "Dessert", "Boisson", "Autre"],
  },
  prepTime: {
    type: Number,
    required: [true, "Le temps de préparation est requis"],
  },

  // ingredients et instructions sont des tableaux de chaînes de caractères, car une recette peut avoir plusieurs ingrédients et étapes d'instructions.
  ingredients: {
    type: [String],
    required: [true, "Les ingrédients sont requis"],
  },

  instructions: {
    type: [String],
    required: [true, "Les instructions sont requises"],
  },

  image: {
    type: String,
    required: false
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

// 3. CRÉATION ET EXPORT DU MODÈLE
module.exports = mongoose.model("Recipe", recipeSchema);