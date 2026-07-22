// Formulaire de modification d'une recette
import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import RecipeForm from "../components/RecipeForm";

export default function EditRecipe() {
  const { id } = useParams(); // Récupère l'ID depuis l'URL /modifier/:id
  const navigate = useNavigate();

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 1. Charger les données actuelles de la recette
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        const data = await response.json();

        if (response.ok) {
          setInitialData(data);
        } else {
          setError(
            data.message || "Erreur lors de la récupération de la recette",
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
  }, [id]);

  // 2. Vérification unique : Utilisateur connecté ET Auteur de la recette
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));

    // Si pas connecté -> Redirection vers Connexion
    if (!currentUser) {
      navigate("/connexion");
      return;
    }

    // Si la recette est chargée, on s'assure qu'il en est bien l'auteur
    if (initialData) {
      const authorId = initialData.author?._id || initialData.author;
      const isAuthor = currentUser._id === authorId;

      if (!isAuthor) {
        alert("Vous n'avez pas l'autorisation de modifier cette recette.");
        navigate("/"); // Retour à l'accueil
      }
    }
  }, [initialData, navigate]);
  
  // 2. Envoyer les modifications au backend (PUT)
  const handleSubmit = async (updatedRecipe) => {
    try {
      const response = await fetch(`http://localhost:5000/api/recipes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedRecipe),
      });

      if (response.ok) {
        console.log("Recette mise à jour avec succès !");
        // Redirection vers la page de détails de la recette
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
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        padding: "0 20px",
        textAlign: "left",
      }}
    >
      <Link to={`/recette/${id}`} style={backLinkStyle}>
        ← Annuler et retourner à la recette
      </Link>

      <h1 style={{ marginBottom: "20px" }}>Modifier la recette</h1>

      {/* On passe initialData à RecipeForm pour qu'il pré-remplisse tous les champs */}
      <RecipeForm initialData={initialData} onSubmit={handleSubmit} />
    </div>
  );
}

// Styles
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
