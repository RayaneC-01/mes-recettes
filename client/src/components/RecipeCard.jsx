import { useNavigate } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div 
      style={cardStyle} 
      onClick={() => navigate(`/recette/${recipe._id}`)}
    >
      {/* Image (si présente) */}
      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} style={imageStyle} />
      )}

      <div style={{ padding: "15px" }}>
        <span style={badgeStyle}>{recipe.category}</span>
        <h3 style={titleStyle}>{recipe.title}</h3>
        
        {/* Temps de préparation (si présent) */}
        {recipe.prepTime && (
          <p style={timeStyle}>⏱️ {recipe.prepTime} mins</p>
        )}
      </div>
    </div>
  );
}

// Styles spécifiques à RecipeCard
const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  cursor: "pointer",
  overflow: "hidden",
  transition: "transform 0.2s ease, box-shadow 0.2s ease",
};

const imageStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
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