import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import DeleteModal from "../components/delete_modal";
import { BASE_URL } from "../services/api";

export default function RecipeDetail() {
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/${id}`);
        const data = await response.json();
        if (response.ok) {
          setRecipe(data);
        } else {
          setError(data.message || "Recette introuvable.");
        }
      } catch (err) {
        console.error("Erreur lors de la récupération de la recette:", err);
        setError("Impossible de se connecter au serveur.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  // --- FONCTIONS DE SÉCURISATION DES DONNÉES ---
  const formatArrayData = (data) => {
    // Si c'est déjà un tableau, on le retourne tel quel
    if (Array.isArray(data)) return data;
    // Si c'est une chaîne de caractères, on la découpe en tableau
    if (typeof data === "string") return data.split("\n").filter(Boolean);
    return [];
  };

  // Vérification stricte des identifiants
  const currentUserId = currentUser?._id || currentUser?.id;
  const recipeAuthorId = recipe?.author?._id || recipe?.author;

  // Est auteur SI les deux IDs existent ET qu'ils sont égaux
  const isOwner = Boolean(
    currentUserId && recipeAuthorId && currentUserId === recipeAuthorId,
  );

  // Est admin si l'utilisateur a le rôle admin
  const isAdmin = currentUser?.role === "admin";

  // Autoriser la modification/suppression uniquement si proprio ou admin
  const canEditOrDelete = isOwner || isAdmin;

  if (loading) {
    return (
      <div style={statusContainerStyle}>
        <div style={loadingStyle}>Chargement de la recette...</div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div style={statusContainerStyle}>
        <div style={errorStyle}>{error || "Recette non trouvée."}</div>
        <Link to="/" style={backButtonStyle}>
          ← Retour à l'accueil
        </Link>
      </div>
    );
  }

  // 💡 Support de recipe.image OU recipe.imageUrl
  const recipeImage = recipe.image || recipe.imageUrl;

  // 💡 Conversion dynamique en tableaux
  const ingredientsList = formatArrayData(recipe.ingredients);
  const instructionsList = formatArrayData(recipe.instructions);

  return (
    <div style={containerStyle}>
      <Link to="/" style={backLinkStyle}>
        ← Retour aux recettes
      </Link>

      <div style={headerSectionStyle}>
        <div style={titleGroupStyle}>
          <span style={categoryBadgeStyle}>{recipe.category || "Général"}</span>
          <h1 style={titleStyle}>{recipe.title}</h1>
        </div>

        {/* Boutons d'action visibles selon permissions */}
        {canEditOrDelete && (
          <div style={actionButtonsStyle}>
            <Link to={`/modifier/${recipe._id}`} style={editButtonStyle}>
              Modifier
            </Link>
            <button
              onClick={() => setIsModalOpen(true)}
              style={deleteButtonStyle}
            >
              Supprimer
            </button>
          </div>
        )}
      </div>

      {/* Affichage de l'image si présente */}
      {recipeImage && (
        <img src={recipeImage} alt={recipe.title} style={imageStyle} />
      )}

      {/* Barres d'infos (Temps, Portions) */}
      <div style={metaGridStyle}>
        <div style={metaCardStyle}>
          <span style={metaIconStyle}>⏱️</span>
          <div>
            <div style={metaLabelStyle}>Temps de préparation</div>
            <div style={metaValueStyle}>{recipe.prepTime || 0} min</div>
          </div>
        </div>

        <div style={metaCardStyle}>
          <span style={metaIconStyle}>🍳</span>
          <div>
            <div style={metaLabelStyle}>Temps de cuisson</div>
            <div style={metaValueStyle}>{recipe.cookTime || 0} min</div>
          </div>
        </div>

        <div style={metaCardStyle}>
          <span style={metaIconStyle}>👥</span>
          <div>
            <div style={metaLabelStyle}>Portions</div>
            <div style={metaValueStyle}>{recipe.servings || 1} pers.</div>
          </div>
        </div>
      </div>


      {/* Ingrédients */}
      <div style={sectionStyle}>
        <h3>Ingrédients</h3>
        {ingredientsList.length > 0 ? (
          <ul style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            {ingredientsList.map((item, index) => (
              <li key={index}>{item.replace(/^•\s*/, "")}</li>
            ))}
          </ul>
        ) : (
          <p>Aucun ingrédient renseigné.</p>
        )}
      </div>

      {/* Instructions */}
      <div style={sectionStyle}>
        <h3>👨‍🍳 Instructions</h3>
        {instructionsList.length > 0 ? (
          <ol style={{ paddingLeft: "20px", lineHeight: "1.8" }}>
            {instructionsList.map((step, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {step.replace(/^\d+\.\s*/, "")}
              </li>
            ))}
          </ol>
        ) : (
          <p>Aucune instruction renseignée.</p>
        )}
      </div>

      {/* Modal de confirmation de suppression */}
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        recipeId={recipe._id}
        recipeTitle={recipe.title}
      />
    </div>
  );
}

// ==========================================
// STYLES
// ==========================================
const containerStyle = {
  maxWidth: "800px",
  margin: "0 auto",
  padding: "20px",
};

const statusContainerStyle = {
  textAlign: "center",
  padding: "50px 20px",
};

const loadingStyle = {
  fontSize: "1.2rem",
  color: "#6c757d",
};

const errorStyle = {
  fontSize: "1.2rem",
  color: "#dc3545",
  marginBottom: "20px",
};

const backButtonStyle = {
  display: "inline-block",
  padding: "10px 15px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  borderRadius: "5px",
  textDecoration: "none",
};

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "20px",
  color: "#0d6efd",
  textDecoration: "none",
  fontWeight: "500",
};

const headerSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "20px",
  flexWrap: "wrap",
  gap: "15px",
};

const titleGroupStyle = {
  flex: "1",
};

const titleStyle = {
  fontSize: "2rem",
  margin: "10px 0 0 0",
  color: "#212529",
};

const categoryBadgeStyle = {
  backgroundColor: "#e9ecef",
  color: "#495057",
  padding: "5px 10px",
  borderRadius: "15px",
  fontSize: "0.85rem",
  fontWeight: "bold",
};

const actionButtonsStyle = {
  display: "flex",
  gap: "10px",
};

const editButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#ffc107",
  color: "#000",
  borderRadius: "5px",
  textDecoration: "none",
  fontWeight: "500",
};

const deleteButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontWeight: "500",
  cursor: "pointer",
};

const imageStyle = {
  width: "100%",
  maxHeight: "400px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "25px",
};

const metaGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "15px",
  marginBottom: "30px",
};

const metaCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  backgroundColor: "#f8f9fa",
  padding: "15px",
  borderRadius: "8px",
  border: "1px solid #e9ecef",
};

const metaIconStyle = {
  fontSize: "1.5rem",
};

const metaLabelStyle = {
  fontSize: "0.8rem",
  color: "#6c757d",
};

const metaValueStyle = {
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#212529",
};

const sectionStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #e9ecef",
  marginBottom: "20px",
};

const listStyle = {
  paddingLeft: "20px",
  lineHeight: "1.8",
  margin: "10px 0 0 0",
};
