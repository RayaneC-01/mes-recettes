import { useState, useEffect } from "react";
import Animation from "../Animation";
import SearchBar from "../components/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import RecipeCard from "../components/RecipeCard";
import BtnTop from "../components/btnTop";
import Loader from "../components/Loader";
import { BASE_URL } from "../services/api";

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
        const response = await fetch(`${BASE_URL}/recipes`);
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
        <h1 style={titleStyle}>Découvrez nos recettes</h1>
        <p style={subtitleStyle}>
          Trouvez l'inspiration pour vos prochains repas parmi toutes nos
          créations gourmandes.
        </p>

        {/* Barre de recherche */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Filtre par catégorie */}
        <CategoryFilter
          selected={selectedCategory}
          onChange={setSelectedCategory}
        />

        {/* Gestion des états : Chargement vs Liste des recettes */}
        {loading ? (
          <div style={loadingStyle}>
            Chargement des délicieuses recettes...
            <Loader />
          </div>
        ) : (
          <div style={gridStyle}>
            {filteredRecipes.length === 0 ? (
              <p style={{ gridColumn: "1 / -1", marginTop: "20px" }}>
                Aucune recette ne correspond à votre recherche.
              </p>
            ) : (
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
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#212529",
  marginBottom: "10px",
};

const subtitleStyle = {
  fontSize: "1.1rem",
  color: "#6c757d",
  marginBottom: "30px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
  gap: "25px",
  width: "100%",
  marginTop: "20px",
};

const loadingStyle = {
  fontSize: "1.2rem",
  color: "#0d6efd",
  marginTop: "40px",
};
