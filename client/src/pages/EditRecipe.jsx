// Formulaire de modification d'une recette
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
  // 1. Récupérer l'ID de la recette depuis l'URL et initialiser le hook de navigation
  const { id } = useParams();
  // 2. Récupérer l'utilisateur connecté depuis le contexte
  const navigate = useNavigate();
  // 3. Récupérer l'utilisateur connecté depuis le contexte
  const { user } = useContext(AuthContext);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Redirection immédiate si l'utilisateur se déconnecte ou n'est pas connecté
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 2. Charger les données actuelles de la recette
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        const data = await response.json();

        if (response.ok) {
          setInitialData(data);

          // Vérification de l'auteur une fois la recette chargée
          const authorId = data.author?._id || data.author;
          if (user && authorId && user._id !== authorId) {
            alert("Vous n'avez pas l'autorisation de modifier cette recette.");
            navigate("/");
          }
        } else {
          setError(
            data.message || "Erreur lors de la récupération de la recette"
          );
        }
      } catch (err) {
        console.error("Erreur lors de la récupération :", err);
        setError("Impossible de contacter le serveur");
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id, user, navigate]);

  // 3. Envoyer les modifications au backend (PUT avec Token d'authentification)
  const handleSubmit = async (updatedRecipe) => {
    try {
      const token = localStorage.getItem("token"); // Récupère le token stocké

      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envoyé pour valider le middleware auth
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (response.ok) {
        console.log("Recette mise à jour avec succès !");
        navigate(`/recette/${id}`);
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Erreur de connexion au serveur");
    }
  };

  if (loading)
    return <div style={statusStyle}>Chargement de la recette...</div>;
  if (error)
    return <div style={{ ...statusStyle, color: "#dc3545" }}>{error}</div>;

  return (
    <div style={containerStyle}>
      <Link to={`/recette/${id}`} style={backLinkStyle}>
        ← Annuler et retourner à la recette
      </Link>

      <h1 style={{ marginBottom: "20px" }}>Modifier la recette</h1>

      <RecipeForm
        style={formStyle}
        initialData={initialData}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

// ==========================================
// STYLES DU CONTENEUR
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

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
};

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "15px",
  color: "#0d6efd",
  textDecoration: "none",
  fontWeight: "bold",
};

const statusStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "1.2rem",
};