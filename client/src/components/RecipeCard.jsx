import { useState } from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const [isHovered, setIsHovered] = useState(false);

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

  const recipeImage = recipe.image || recipe.imageUrl;

  return (
    <div
      style={combinedCardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image de la recette */}
      {recipeImage ? (
        <img
          src={recipeImage}
          alt={recipe.title}
          style={combinedImageStyle}
        />
      ) : (
        <div style={noImageStyle}>
          <span>📷 Aucune image</span>
        </div>
      )}

      {/* Contenu de la carte */}
      <div style={{ padding: "15px" }}>
        <h3 style={titleStyle}>{recipe.title}</h3>

        <span style={badgeStyle}>{recipe.category}</span>

        {recipe.prepTime && <p style={timeStyle}>⏱️ {recipe.prepTime} mins</p>}

        <Link to={`/recette/${recipe._id}`} style={buttonStyle}>
          Voir la recette
        </Link>
      </div>
    </div>
  );
}

// Styles
const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  overflow: "hidden",
  transition: "all 0.3s ease",
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  transition: "transform 0.3s ease",
};

const noImageStyle = {
  width: "100%",
  height: "150px",
  backgroundColor: "#e9ecef",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#6c757d",
  fontSize: "0.9rem",
};

const titleStyle = {
  margin: "10px 0 5px 0",
  fontSize: "1.2rem",
  color: "#212529",
};

const badgeStyle = {
  display: "inline-block",
  padding: "4px 8px",
  backgroundColor: "#e9ecef",
  color: "#495057",
  borderRadius: "4px",
  fontSize: "0.85rem",
  marginBottom: "10px",
};

const timeStyle = {
  fontSize: "0.9rem",
  color: "#6c757d",
  margin: "5px 0 15px 0",
};

const buttonStyle = {
  display: "inline-block",
  padding: "8px 12px",
  backgroundColor: "#0d6efd",
  color: "#ffffff",
  textDecoration: "none",
  borderRadius: "5px",
  fontSize: "0.9rem",
  fontWeight: "500",
  textAlign: "center",
  width: "100%",
  boxSizing: "border-box",
};