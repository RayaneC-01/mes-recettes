// ==========================================
// COMPOSANT : EDITION D'UNE RECETTE
// ==========================================
import { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import RecipeForm from "../components/RecipeForm"; // Formulaire réutilisable (Création / Edition)

export default function EditRecipe() {
  // 1. HOOKS ET CONTEXTE
  const { id } = useParams(); // Récupération de l'ID de la recette depuis l'URL
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // Utilisateur connecté globalement

  // 2. ETATS LOCAUX
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 3. PROTECTION : Redirection si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // 4. CHARGEMENT DE LA RECETTE ET VERIFICATION DES DROITS
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/recipes/${id}`);
        const data = await response.json();

        if (response.ok) {
          setInitialData(data);

          // Vérification : Seul l'auteur a le droit d'accéder à cette page !
          const authorId = data.author?._id || data.author;
          if (user && authorId && user._id !== authorId) {
            alert("Vous n'avez pas l'autorisation de modifier cette recette.");
            navigate("/");
          }
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
  }, [id, user, navigate]);

  // 5. ENVOI DES MODIFICATIONS AU BACKEND (PUT)
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
        navigate(`/recette/${id}`); // Redirection vers la fiche de la recette modifiée
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Erreur lors de la mise à jour");
      }
    } catch (err) {
      console.error("Erreur lors de la mise à jour :", err);
      alert("Erreur de connexion au serveur");
    }
  };

  // 6. GESTION DES ETATS DE CHARGEMENT ET D'ERREUR (GUARD CLAUSES)
  if (loading)
    return <div style={statusStyle}>Chargement de la recette...</div>;
  if (error)
    return <div style={{ ...statusStyle, color: "#dc3545" }}>{error}</div>;

  // 7. RENDU DU FORMULAIRE
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
// 8. STYLES DU CONTENEUR
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
