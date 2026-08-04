import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import { BASE_URL } from "../services/api";

export default function AddRecipe() {
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCreateRecipe = async (formData) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const recipeData = {
        ...formData,
        author: user?._id || user?.id,
      };

      const response = await fetch(`${BASE_URL}/recipes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(recipeData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Recette ajoutée avec succès !");
        setTimeout(() => {
          navigate(`/recette/${data._id || data.id}`);
        }, 1500);
      } else {
        setErrorMessage(data.message || "Erreur lors de la création");
      }
    } catch (error) {
      console.error("Erreur :", error);
      setErrorMessage("Impossible de se connecter au serveur");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={{ marginBottom: "25px", textAlign: "center" }}>
        Ajouter une recette
      </h1>

      {successMessage && <div style={successStyle}>{successMessage}</div>}
      {errorMessage && <div style={errorStyle}>{errorMessage}</div>}

      <RecipeForm onSubmit={handleCreateRecipe} />
    </div>
  );
}

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