import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import "./index.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
//barre de recherche + filtres
import SearchBar from "./components/SearchBar";
import AddRecipe from './pages/AddRecipe';
import RecipeDetail from './pages/RecipeDetail';
import EditRecipe from './pages/EditRecipe';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* L'ordre n'impacte pas le fonctionnement */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/search" element={<SearchBar />} />
          <Route path="/ajouter" element={<AddRecipe />} />
          <Route path="/recette/:id" element={<RecipeDetail />} />
          <Route path="/modifier/:id" element={<EditRecipe />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
