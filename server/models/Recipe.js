//Modele de recette
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Définition du schéma de la recette
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
  ingredients: {
    type: String,
    required: [true, "Les ingrédients sont requis"],
  },
  instructions: {
    type: String,
    required: [true, "Les instructions sont requises"],
  },
  image: { type: String, required: false },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "L'auteur de la recette est requis"],
  },
  createdAt: { type: Date, default: Date.now },
});

// Export du modèle pour l'utiliser dans le reste du projet
module.exports = mongoose.model("Recipe", recipeSchema);
