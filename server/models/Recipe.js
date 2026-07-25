// 1. IMPORTS
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


// 2. DÉFINITION DU SCHÉMA (STRUCTURE MONGODB)
const recipeSchema = new Schema({
  // Titre de la recette
  title: {
    type: String,
    required: [true, "Le titre de la recette est requis"],
  },

  // Catégorie restreinte à une liste précise grâce à 'enum'
  category: {
    type: String,
    required: [true, "La catégorie de la recette est requise"],
    enum: ["Entrée", "Plat", "Dessert", "Boisson", "Autre"],
  },

  // Temps de préparation (en minutes)
  prepTime: {
    type: Number,
    required: [true, "Le temps de préparation est requis"],
  },

  // Ingrédients sous forme de texte
  ingredients: {
    type: String,
    required: [true, "Les ingrédients sont requis"],
  },

  // Étapes de préparation sous forme de texte
  instructions: {
    type: String,
    required: [true, "Les instructions sont requises"],
  },

  // Lien/URL de l'image (optionnel)
  image: { 
    type: String, 
    required: false 
  },

  //Référence vers l'utilisateur qui a créé la recette
  author: {
    type: Schema.Types.ObjectId,
    ref: "User", // Fait référence au modèle "User"
    required: [true, "L'auteur de la recette est requis"],
  },

  // Date de création générée automatiquement lors de l'enregistrement
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});


// 3. CRÉATION ET EXPORT DU MODÈLE
module.exports = mongoose.model("Recipe", recipeSchema);