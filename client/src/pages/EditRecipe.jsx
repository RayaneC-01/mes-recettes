import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RecipeForm from "../components/RecipeForm";
import { BASE_URL } from "../services/api";

export default function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/recipes/${id}`);
        const data = await response.json();

        if (response.ok) {
          const isOwner = Boolean(
            currentUserId && authorId && currentUserId === authorId,
          );
          const isAdmin = user?.role === "admin";

          if (!isOwner && !isAdmin) {
            alert("Vous n'êtes pas autorisé à modifier cette recette.");
            navigate(`/recette/${id}`);
            return;
          }

          setInitialData(data);
        } else {
          setError(data.message || "Impossible de récupérer la recette");
        }
      } catch (err) {
        console.error("Erreur de chargement :", err);
        setError("Erreur réseau lors de la récupération de la recette");
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchRecipeDetails();
    }
  }, [id, user, navigate]);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Recette mise à jour avec succès !");
        navigate(`/recette/${id}`);
      } else {
        alert(data.message || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error("Erreur de mise à jour :", err);
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

const backLinkStyle = {
  display: "inline-block",
  marginBottom: "15px",
  color: "#6c757d",
  textDecoration: "none",
  fontSize: "0.95rem",
};

const statusStyle = {
  textAlign: "center",
  marginTop: "50px",
  fontSize: "1.2rem",
};

const formStyle = {};
