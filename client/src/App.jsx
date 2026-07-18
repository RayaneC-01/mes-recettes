// 1. IMPORTATIONS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login'; 

// Une mini-page d'accueil temporaire juste pour tester la redirection
function HomeTemporary() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Bienvenue sur MesRecettes ! 🍳</h1>
      <p>Ceci est la page d'accueil.</p>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* La Navbar est posée ici : elle reste fixe tout le temps */}
        <Navbar />
        {/* Le contenu sous la Navbar change selon l'adresse URL */}
        <Routes>
          {/* Route pour l'accueil */}
          <Route path="/" element={<HomeTemporary />} />
          
          {/* Route pour la page de connexion */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;