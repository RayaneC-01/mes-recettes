import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateRecipe = async (formData) => {
    // Réinitialisation des messages
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const recipeData = {
        ...formData,
        author: user?._id || user?.id,
      };

      const response = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(recipeData),
      });

      const data = await response.json();

      if (response.ok) {
        // 1. Afficher le message de succès dans la page
        setSuccessMessage("🎉 Recette ajoutée avec succès ! Redirection en cours...");
        
        // 2. Attendre 2 secondes avant de rediriger vers l'accueil
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        setErrorMessage(data.message || "Erreur lors de l'ajout de la recette");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setErrorMessage("Impossible de se connecter au serveur");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ textAlign: "center" }}>Ajouter une recette</h1>

      {/* Message de succès stylisé */}
      {successMessage && (
        <div style={successStyle}>
          {successMessage}
        </div>
      )}

      {/* Message d'erreur stylisé */}
      {errorMessage && (
        <div style={errorStyle}>
          {errorMessage}
        </div>
      )}

      <RecipeForm onSubmit={handleCreateRecipe} />
    </div>
  );
}

// Styles simples pour les notifications
const successStyle = {
  backgroundColor: "#d4edda",
  color: "#155724",
  padding: "12px 20px",
  borderRadius: "8px",
  marginBottom: "20px",
  textAlign: "center",
  border: "1px solid #c3e6cb",
  fontWeight: "bold",
};

const errorStyle = {
  backgroundColor: "#f8d7da",
  color: "#721c24",
  padding: "12px 20px",
  borderRadius: "8px",
  marginBottom: "20px",
  textAlign: "center",
  border: "1px solid #f5c6cb",
  fontWeight: "bold",
};