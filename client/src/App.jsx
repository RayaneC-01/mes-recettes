import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
// import AddRecipe from './pages/AddRecipe';
// import RecipeDetail from './pages/RecipeDetail';
// import EditRecipe from './pages/EditRecipe';



function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/ajouter" element={<AddRecipe />} /> */}
          {/* <Route path="/recette/:id" element={<RecipeDetail />} /> */}
          {/* <Route path="/modifier/:id" element={<EditRecipe />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

