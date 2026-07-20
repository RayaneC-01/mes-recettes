import { useState, useEffect } from "react";
import Animation from "../Animation";

function Home() {
  // État pour stocker les recettes récupérées depuis le backend
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour la recherche et le filtre par catégorie
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  const categories = ["Toutes", "Entrée", "Plat", "Dessert", "Boisson"];

  useEffect(() => {
    // Fonction pour récupérer les recettes depuis le backend
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes");
        // Vérification de la réponse
        const data = await response.json();
        // Si la réponse est OK, on met à jour l'état des recettes
        if (response.ok) {
          setRecipes(data);
        }
        // Sinon, on affiche une erreur dans la console
      } catch (error) {
        console.error("Erreur lors du chargement des recettes :", error);
      } finally {
        setLoading(false);
      }
    };
    // Appel de la fonction pour récupérer les recettes
    fetchRecipes();
  }, []);

// Filtrage simple (titre + catégorie)
const filteredRecipes = recipes.filter((recipe) => {
  // Vérification si le titre de la recette contient la requête de recherche (insensible à la casse)
  const matchesSearch = recipe.title?.toLowerCase().includes(searchQuery.toLowerCase());
  // Vérification si la catégorie de la recette correspond à la catégorie sélectionnée ou si "Toutes" est sélectionné
  const matchesCategory = selectedCategory === "Toutes" || recipe.category === selectedCategory;
// Retourne true si les deux conditions sont remplies, sinon false
  return matchesSearch && matchesCategory;
});

  return (
    <div style={containerStyle}>
      <Animation />

      <div style={contentWrapperStyle}>
        <h1 style={titleStyle}>
          Bienvenue sur MesRecettes ! <span>🍳</span>
        </h1>
        <p style={subtitleStyle}>
          Découvrez, créez et partagez vos meilleures inspirations culinaires.
        </p>

        {/* Barre de recherche & filtres */}
        <div style={filterContainerStyle}>
          <input
            type="text"
            placeholder="🔍 Rechercher une recette..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={searchBarStyle}
          />

          <div style={categoryTabsStyle}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                style={{
                  ...categoryButtonStyle,
                  backgroundColor:
                    selectedCategory === category ? "#0d6efd" : "#ffffff",
                  color: selectedCategory === category ? "#ffffff" : "#495057",
                  border:
                    selectedCategory === category
                      ? "1px solid #0d6efd"
                      : "1px solid #ced4da",
                }}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Liste des recettes */}
        {loading ? (
          <p>Chargement des recettes... ⏳</p>
        ) : (
          <div style={gridStyle}>
            {filteredRecipes.length === 0 ? (
              <p>Aucune recette trouvée.</p>
            ) : (
              filteredRecipes.map((recipe) => (
                <div key={recipe._id} style={cardStyle}>
                  <h3>{recipe.title}</h3>
                  <p>{recipe.description}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  position: "relative",
  minHeight: "calc(100vh - 70px)",
  backgroundColor: "#f8f9fa",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "60px 20px",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const contentWrapperStyle = {
  position: "relative",
  zIndex: 10,
  width: "100%",
  maxWidth: "1000px",
  textAlign: "center",
};

const titleStyle = {
  fontSize: "3rem",
  fontWeight: "800",
  color: "#212529",
  marginBottom: "15px",
};

const subtitleStyle = {
  fontSize: "1.2rem",
  color: "#495057",
  marginBottom: "30px",
};

const filterContainerStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  alignItems: "center",
  marginBottom: "30px",
};

const searchBarStyle = {
  width: "100%",
  maxWidth: "500px",
  padding: "10px 18px",
  borderRadius: "25px",
  border: "1px solid #ced4da",
  fontSize: "1rem",
};

const categoryTabsStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  justifyContent: "center",
};

const categoryButtonStyle = {
  padding: "6px 14px",
  borderRadius: "16px",
  fontWeight: "600",
  cursor: "pointer",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  padding: "20px",
  borderRadius: "8px",
  border: "1px solid #dee2e6",
  textAlign: "left",
};

export default Home;
