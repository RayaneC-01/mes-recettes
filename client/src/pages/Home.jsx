import { useState, useEffect } from "react";
import Animation from "../Animation";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecipeCard from "../components/RecipeCard";
import BtnTop from "../components/btnTop";


export default function Home() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  // États pour la recherche et la catégorie
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Toutes");

  // Charger les recettes depuis l'API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/recipes");
        const data = await response.json();
        if (response.ok) {
          setRecipes(data);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des recettes :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filtrage combiné (recherche texte + catégorie)
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "Toutes" || recipe.category === selectedCategory;

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

        {/* Barre de recherche (Composant séparé) */}
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Filtres par catégories (Composant séparé) */}
        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Liste des recettes */}
        {loading ? (
          <p style={{ marginTop: "30px" }}>Chargement des recettes... ⏳</p>
        ) : (
          <div style={gridStyle}>
            {filteredRecipes.length === 0 ? (
              <p style={{ gridColumn: "1 / -1", marginTop: "20px" }}>
                Aucune recette ne correspond à votre recherche.
              </p>
            ) : (
              // Affichage des recettes filtrées ou Toutes les recettes si aucun filtre n'est appliqué
              filteredRecipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))
            )}
          </div>
        )}

        {/* Bouton pour remonter en haut de la page */}
        <BtnTop
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
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
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
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
const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
  gap: "20px",
  width: "100%",
  marginTop: "10px",
};
