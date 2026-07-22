import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();
  // 1. État pour suivre le survol de la carte
  const [isHovered, setIsHovered] = useState(false);

  // 2. Styles dynamiques combinés avec le hover
  const combinedCardStyle = {
    ...cardStyle,
    transform: isHovered ? "translateY(-6px)" : "translateY(0)",
    boxShadow: isHovered
      ? "0 10px 20px rgba(0, 0, 0, 0.15)"
      : "0 2px 5px rgba(0, 0, 0, 0.05)",
  };

  const combinedImageStyle = {
    ...imageStyle,
    transform: isHovered ? "scale(1.03)" : "scale(1)",
  };

  return (
    <div
      style={combinedCardStyle}
      onClick={() => navigate(`/recette/${recipe._id}`)}
      // 3. Déclencheurs de l'animation au survol
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image de chaque recette */}
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.title} style={combinedImageStyle} />
      ) : (
        <div
          style={{
            ...imageStyle,
            backgroundColor: "#f8f9fa",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#6c757d" }}>Aucune image disponible</span>
        </div>
      )}

      <div style={{ padding: "15px" }}>
        <h3 style={titleStyle}>{recipe.title}</h3>
        <span style={badgeStyle}>{recipe.category}</span>

        {/* Temps de préparation (si présent) */}
        {recipe.prepTime && <p style={timeStyle}>⏱️ {recipe.prepTime} mins</p>}

        {/* Bouton Voir la recette en détail */}
        <Link to={`/recette/${recipe._id}`} style={buttonStyle}>
          Voir la recette
        </Link>
      </div>
    </div>
  );
}

// Styles spécifiques à RecipeCard
const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #dee2e6", // Réduit un peu la bordure de 5px à 1px pour un rendu plus moderne !
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  cursor: "pointer",
  overflow: "hidden",
  transition: "all 0.3s ease", // Animation fluide
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  transition: "transform 0.3s ease", // Animation fluide pour le zoom image
};

const titleStyle = {
  margin: "10px 0 5px 0",
  fontSize: "1.2rem",
  color: "#212529",
};

const badgeStyle = {
  fontSize: "0.75rem",
  fontWeight: "bold",
  color: "#0d6efd",
  textTransform: "uppercase",
};

const timeStyle = {
  fontSize: "0.85rem",
  color: "#495057",
  fontWeight: "500",
  margin: 0,
};

const buttonStyle = {
  display: "inline-block",
  marginTop: "10px",
  padding: "7px 8px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  borderRadius: "4px",
  textDecoration: "none",
  fontWeight: "bold",
};