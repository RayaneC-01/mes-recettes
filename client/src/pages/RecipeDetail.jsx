// Detail complet d'une recette (accessible à tous)
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setRecipe(data);
        } else {
          setError(data.message || "Erreur lors de la récupération de la recette");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de la recette :", err);
        setError("Impossible de se connecter au serveur");
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div style={statusContainerStyle}>
        <div style={loadingStyle}>⏳ Chargement de la recette...</div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div style={statusContainerStyle}>
        <div style={errorStyle}>{error || "Recette introuvable"}</div>
        <Link to="/" style={backButtonStyle}>← Retour à l'accueil</Link>
      </div>
    );
  }

  // Découpage propre par saut de ligne (filtre les lignes vides)
  const instructionsList = recipe.instructions
    ? recipe.instructions.split("\n").filter((step) => step.trim() !== "")
    : [];

  const ingredientsList = recipe.ingredients
    ? recipe.ingredients.split("\n").filter((item) => item.trim() !== "")
    : [];

  return (
    <div style={containerStyle}>
      {/* Bouton Retour */}
      <Link to="/" style={backLinkStyle}>
        ← Retour aux recettes
      </Link>

      <article style={cardStyle}>
        {/* Titre & Badges */}
        <h1 style={titleStyle}>{recipe.title}</h1>

        <div style={badgeContainerStyle}>
          <span style={categoryBadgeStyle}>{recipe.category}</span>
          <span style={timeBadgeStyle}>⏱️ {recipe.prepTime} min</span>
        </div>

        {/* Image */}
        {recipe.image && (
          <img src={recipe.image} alt={recipe.title} style={imageStyle} />
        )}

        {/* Auteur */}
        {recipe.author && (
          <p style={authorStyle}>
            Recette proposée par <strong>{recipe.author.username || recipe.author.name || "un chef anonyme"}</strong>
          </p>
        )}

        <hr style={separatorStyle} />

        {/* Ingrédients */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>🛒 Ingrédients</h2>
          <ul style={listStyle}>
            {ingredientsList.map((item, index) => (
              <li key={index} style={listItemStyle}>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <hr style={separatorStyle} />

        {/* Instructions */}
        <div style={sectionStyle}>
          <h2 style={sectionTitleStyle}>👨‍🍳 Instructions de préparation</h2>
          <ol style={orderedListStyle}>
            {instructionsList.map((step, index) => (
              <li key={index} style={stepItemStyle}>
                {step}
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
}

// ==========================================
// STYLES CSS
// ==========================================
const containerStyle = {
  maxWidth: "850px",
  margin: "40px auto",
  padding: "0 20px",
  fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
};

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "20px",
  color: "#0d6efd",
  textDecoration: "none",
  fontWeight: "600",
  fontSize: "0.95rem",
  transition: "transform 0.2s ease",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "35px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
  border: "1px solid #f0f0f0",
  textAlign: "left",
};

const titleStyle = {
  fontSize: "2.2rem",
  color: "#212529",
  marginBottom: "12px",
  fontWeight: "700",
  lineHeight: "1.2",
};

const badgeContainerStyle = {
  display: "flex",
  gap: "10px",
  marginBottom: "24px",
  alignItems: "center",
};

const categoryBadgeStyle = {
  backgroundColor: "#e7f1ff",
  color: "#0c63e4",
  padding: "6px 14px",
  borderRadius: "50px",
  fontSize: "0.85rem",
  fontWeight: "700",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
};

const timeBadgeStyle = {
  backgroundColor: "#fff8e6",
  color: "#b45309",
  padding: "6px 14px",
  borderRadius: "50px",
  fontSize: "0.85rem",
  fontWeight: "700",
};

const imageStyle = {
  width: "100%",
  maxHeight: "420px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "24px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
};

const authorStyle = {
  color: "#6c757d",
  fontSize: "0.95rem",
  margin: "0 0 10px 0",
};

const separatorStyle = {
  border: "0",
  borderTop: "1px solid #eaeaea",
  margin: "28px 0",
};

const sectionStyle = {
  marginBottom: "10px",
};

const sectionTitleStyle = {
  fontSize: "1.35rem",
  color: "#1a1a1a",
  marginBottom: "16px",
  fontWeight: "600",
};

const listStyle = {
  paddingLeft: "20px",
  margin: "0",
  color: "#374151",
  lineHeight: "1.7",
};

const listItemStyle = {
  marginBottom: "8px",
  fontSize: "1.05rem",
};

const orderedListStyle = {
  paddingLeft: "20px",
  margin: "0",
  color: "#374151",
};

const stepItemStyle = {
  marginBottom: "14px",
  fontSize: "1.05rem",
  lineHeight: "1.6",
  paddingLeft: "5px",
};

const statusContainerStyle = {
  maxWidth: "500px",
  margin: "80px auto",
  padding: "30px",
  backgroundColor: "#fff",
  borderRadius: "12px",
  boxShadow: "0 4px 15px rgba(0,0,0,0.05)",
  textAlign: "center",
};

const loadingStyle = {
  fontSize: "1.2rem",
  color: "#0d6efd",
  fontWeight: "600",
};

const errorStyle = {
  fontSize: "1.2rem",
  color: "#dc3545",
  fontWeight: "bold",
  marginBottom: "20px",
};

const backButtonStyle = {
  display: "inline-block",
  padding: "10px 20px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  borderRadius: "6px",
  textDecoration: "none",
  fontWeight: "bold",
};