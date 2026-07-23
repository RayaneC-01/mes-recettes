import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateRecipe = async (formData) => {
  setSuccessMessage("");
  setErrorMessage("");

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    // On prépare les données en incluant l'ID de l'auteur
    const recipeData = {
      ...formData,
      author: user?._id || user?.id,
    };

    const response = await fetch("http://localhost:5000/api/recipes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipeData),
    });

    const data = await response.json();

    if (response.ok) {
      setSuccessMessage("🎉 Recette ajoutée avec succès ! Redirection...");
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
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "25px", textAlign: "center" }}>Ajouter une recette</h1>

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

// ==========================================
// STYLES DU CONTENEUR (Identiques à EditRecipe)
// ==========================================
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

// Styles pour les notifications
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