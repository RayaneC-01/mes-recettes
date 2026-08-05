import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { BASE_URL } from "../services/api";

export default function AddRecipe() {
  const navigate = useNavigate();
  
  // États pour gérer les messages de retour utilisateur
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  /**
   * Helper : Nettoie et transforme une chaîne de texte (ou un tableau) en un Tableau Array valide.
   * Si l'utilisateur entre "Farine, Sucre" ou du texte avec des sauts de ligne,
   * cette fonction découpe le texte pour créer un tableau ['Farine', 'Sucre'].
   */
  const formatArrayData = (data) => {
    // Si c'est déjà un tableau, on le renvoie tel quel
    if (Array.isArray(data)) return data;

    // Si c'est une chaîne de caractères non vide
    if (typeof data === "string" && data.trim() !== "") {
      return data
        .split(/[\n,]+/)          // Découpe par virgule OU par retour à la ligne
        .map((item) => item.trim()) // Enlève les espaces inutiles autour de chaque élément
        .filter(Boolean);          // Supprime les éléments vides
    }

    // Par défaut, renvoie un tableau vide
    return [];
  };

  /**
   * Fonction de soumission du formulaire
   * Reçoit les données brutes saisies par l'utilisateur (formData)
   */
  const handleCreateRecipe = async (formData) => {
    // Réinitialisation des messages d'état
    setSuccessMessage("");
    setErrorMessage("");

    try {
      // Récupération de l'utilisateur connecté dans le localStorage
      const user = JSON.parse(localStorage.getItem("user"));

      // Formatage et sécurisation de l'objet recette avant l'envoi
      const recipeData = {
        ...formData,
        // Conversion explicite en tableaux pour éviter l'erreur TypeError .map()
        ingredients: formatArrayData(formData.ingredients),
        instructions: formatArrayData(formData.instructions),
        // Attribution de l'auteur (supporte _id ou id)
        author: user?._id || user?.id,
      };

      // Requête HTTP POST vers l'API backend
      const response = await fetch(`${BASE_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const data = await response.json();

      // Traitement de la réponse du serveur
      if (response.ok) {
        setSuccessMessage("Recette ajoutée avec succès !");
        
        // Redirection automatique vers la page de la recette créée après 1.5s
        setTimeout(() => {
          navigate(`/recette/${data._id || data.id}`);
        }, 1500);
      } else {
        setErrorMessage(data.message || "Erreur lors de la création");
      }
    } catch (error) {
      console.error("Erreur lors de la création de la recette :", error);
      setErrorMessage("Impossible de se connecter au serveur");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "25px", textAlign: "center" }}>
        Ajouter une recette
      </h1>

      {/* Affichage conditionnel des messages de succès ou d'erreur */}
      {successMessage && <div style={successStyle}>{successMessage}</div>}
      {errorMessage && <div style={errorStyle}>{errorMessage}</div>}

      {/* Composant formulaire réutilisable */}
      <RecipeForm onSubmit={handleCreateRecipe} />
    </div>
  );
}

// --- STYLES EN INLINE CSS ---
const containerStyle = {
  width: "100%",
  maxWidth: "800px",
  margin: "0 auto",
  padding: "30px 20px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  border: "1px solid #eaeaea",
  boxSizing: "border-box",
};

const successStyle = {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "12px 20px",
  borderRadius: "8px",
  marginBottom: "20px",
  textAlign: "center",
};

const errorStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "12px 20px",
  borderRadius: "8px",
  marginBottom: "20px",
  textAlign: "center",
};