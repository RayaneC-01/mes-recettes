import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
//barre de recherche + filtres
import SearchBar from "./components/SearchBar";
//ajouter une recette
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import EditRecipe from "./pages/EditRecipe";

// Route principale de l'application, encapsulée dans le AuthProvider pour gérer l'état d'authentification global.
// Le Router est utilisé pour gérer la navigation entre les différentes pages de l'application, puis les Routes définissent les chemins et les composants correspondants.
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          {/* Route de chaque fichier */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/ajouter" element={<AddRecipe />} />
          <Route path="/recette/:id" element={<RecipeDetail />} />
          <Route path="/modifier/:id" element={<EditRecipe />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
