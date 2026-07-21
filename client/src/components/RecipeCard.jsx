import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function RecipeCard({ recipe }) {
  const navigate = useNavigate();

  return (
    <div style={cardStyle} onClick={() => navigate(`/recette/${recipe._id}`)}>
        {/* Image de chaque recette */}
      {recipe.image ? (
        <img src={recipe.image} alt={recipe.title} style={imageStyle} />
        ) : (
        <div style={{ ...imageStyle, backgroundColor: "#f8f9fa", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#6c757d" }}>Aucune image disponible</span>
        </div>
      )}
      <div style={{ padding: "15px" }}>
        <h3 style={titleStyle}>{recipe.title}</h3>
        <span style={badgeStyle}>{recipe.category}</span>

        {/* Temps de préparation (si présent) */}
        {recipe.prepTime && <p style={timeStyle}>⏱️ {recipe.prepTime} mins</p>}
        {/*Bouton Voir la recette en detail */}
        <Link
          to={`/recette/${recipe._id}`}
          style={buttonStyle}
        >
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

const buttonStyle = {
  display: "inline-block",
  marginTop: "10px",
  padding:"7px 8px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  borderRadius: "4px",
  textDecoration: "none",
  fontWeight: "bold",
};