import { useNavigate } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

export default function AddRecipe() {
  const navigate = useNavigate();

  const handleCreateRecipe = async (formData) => {
    try {
      // 1. On récupère le token d'authentification
      const token = localStorage.getItem("token");

      // 2. Requête POST vers l'API
      const response = await fetch("http://localhost:5000/api/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Recette ajoutée avec succès ! 🎉");
        navigate("/"); // Redirection vers l'accueil
      } else {
        alert(data.message || "Erreur lors de l'ajout de la recette");
      }
    } catch (error) {
      console.error("Erreur :", error);
      alert("Impossible de se connecter au serveur");
    }
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Ajouter une recette</h1>
      <p style={subtitleStyle}>
        Partagez vos créations culinaires avec la communauté !
      </p>

      {/* On oublie pas de passer onSubmit ici ! */}
      <RecipeForm onSubmit={handleCreateRecipe} />
    </div>
  );
}

const containerStyle = {
  maxWidth: "600px",
  margin: "0 auto",
  padding: "20px",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "2rem",
  marginBottom: "10px",
};

const subtitleStyle = {
  textAlign: "center",
  fontSize: "1rem",
  marginBottom: "30px",
  color: "#6c757d",
};