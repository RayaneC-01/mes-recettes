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
    if (Array.isArray(data)) return data;
    if (typeof data === "string" && data.trim() !== "") {
      // Découpe par saut de ligne ou par virgule
      return data
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
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

        {/* 2. On affiche les boutons SEULEMENT si canEditOrDelete est true */}
        {canEditOrDelete && (
          <div style={actionButtonsStyle}>
            <Link
              to={`/modifier-recette/${recipe._id}`}
              style={editButtonStyle}
            >
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

        {/* 3. On passe isOpen et onClose à la modale */}
        <DeleteModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>

      {recipe.imageUrl && (
        <img src={recipe.imageUrl} alt={recipe.title} style={imageStyle} />
      )}

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
            <div style={metaValueStyle}>{recipe.servings || 1} personne(s)</div>
          </div>
        </div>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Ingrédients</h2>
        <ul style={ingredientsListStyle}>
          {ingredientsList.length > 0 ? (
            ingredientsList.map((ing, index) => (
              <li key={index} style={listItemStyle}>
                {ing}
              </li>
            ))
          ) : (
            <li>Aucun ingrédient spécifié.</li>
          )}
        </ul>
      </div>

      <div style={sectionStyle}>
        <h2 style={sectionTitleStyle}>Instructions</h2>
        <ol style={orderedListStyle}>
          {instructionsList.length > 0 ? (
            instructionsList.map((step, index) => (
              <li key={index} style={stepItemStyle}>
                {step}
              </li>
            ))
          ) : (
            <li>Aucune instruction spécifiée.</li>
          )}
        </ol>
      </div>

      <DeleteModal
        isOpen={isModalOpen} // ✅ Passer la variable, ne pas l'appeler !
        onClose={() => setIsModalOpen(false)}
        recipeId={recipe._id}
        recipeTitle={recipe.title}
      />
    </div>
  );
}

const containerStyle = {
  width: "100%",
  maxWidth: "900px", // Permet d'occuper une belle largeur sur grand écran
  margin: "0 auto", // Centre la carte sur l'écran
  padding: "20px",
  boxSizing: "border-box",
};

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "20px",
  color: "#6b7280",
  textDecoration: "none",
  fontWeight: "500",
};

const headerSectionStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  flexWrap: "wrap",
  gap: "20px",
  marginBottom: "25px",
};

const titleGroupStyle = {
  flex: "1",
};

const categoryBadgeStyle = {
  display: "inline-block",
  padding: "4px 12px",
  backgroundColor: "#e0e7ff",
  color: "#4338ca",
  borderRadius: "20px",
  fontSize: "0.85rem",
  fontWeight: "600",
  marginBottom: "10px",
};

const titleStyle = {
  fontSize: "2.2rem",
  color: "#111827",
  margin: "0",
  fontWeight: "800",
};

const actionButtonsStyle = {
  display: "flex",
  gap: "10px",
};

const editButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#f3f4f6",
  color: "#374151",
  borderRadius: "8px",
  textDecoration: "none",
  fontWeight: "600",
};

const deleteButtonStyle = {
  padding: "8px 16px",
  backgroundColor: "#fee2e2",
  color: "#dc2626",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const imageStyle = {
  width: "100%",
  maxHeight: "400px",
  objectFit: "cover",
  borderRadius: "12px",
  marginBottom: "30px",
};

const metaGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "15px",
  marginBottom: "35px",
  padding: "20px",
  backgroundColor: "#f9fafb",
  borderRadius: "12px",
};

const metaCardStyle = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
};

const metaIconStyle = {
  fontSize: "1.5rem",
};

const metaLabelStyle = {
  fontSize: "0.85rem",
  color: "#6b7280",
};

const metaValueStyle = {
  fontSize: "1.1rem",
  fontWeight: "700",
  color: "#111827",
};

const sectionStyle = {
  marginBottom: "30px",
};

const sectionTitleStyle = {
  fontSize: "1.4rem",
  color: "#111827",
  borderBottom: "2px solid #f3f4f6",
  paddingBottom: "8px",
  marginBottom: "15px",
};

const ingredientsListStyle = {
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
  padding: "10px 20px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  textDecoration: "none",
  borderRadius: "6px",
};
