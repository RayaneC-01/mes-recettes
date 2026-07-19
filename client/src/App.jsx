// 1. IMPORTATIONS
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Login from './pages/Login'; 
import Animation from './Animation'; 
import Register from './pages/Register'; // Importation de la page Register
function Home() {
  return (
    <div style={containerStyle}>
      {/* 1. L'animation en arrière-plan (qui couvrira tout le conteneur) */}
      <Animation />

      {/* 2. Le contenu au premier plan, direct et épuré */}
      <div style={contentWrapperStyle}>
        <h1 style={titleStyle}>Bienvenue sur MesRecettes ! <span>🍳</span></h1>
        <p style={subtitleStyle}>
          Découvrez, créez et partagez vos meilleures inspirations culinaires dans un espace moderne et interactif.
        </p>
        <button style={btnPrimaryStyle}>Explorer les recettes</button>
        
        {/* C'est ici que tu pourras injecter tes filtres et tes recettes plus tard ! */}
      </div>
    
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        {/* La Navbar reste fixe tout le temps */}
        <Navbar />
        {/* Le contenu sous la Navbar change selon l'adresse URL */}
        <Routes>
          {/* Route pour l'accueil */}
          <Route path="/" element={<Home />} />
          
          {/* Route pour la page de connexion */}
          <Route path="/login" element={<Login />} />
          {/* Route pour la page d'inscription */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

// ==========================================
// STYLES ADAPTÉS (LUMINEUX, PUR ET EXTENSIBLE)
// ==========================================
const containerStyle = {
  position: 'relative',
  minHeight: 'calc(100vh - 70px)', // Au minimum prend tout l'écran sous la navbar
  height: 'auto',                  // S'étire automatiquement si tu ajoutes du contenu en bas
  backgroundColor: '#f8f9fa',      // Fond par défaut Bootstrap
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  overflow: 'visible',             // Permet de scroller vers le bas proprement
  padding: '60px 20px',
  fontFamily: 'system-ui, -apple-system, sans-serif'
};

// Conteneur de contenu transparent pour laisser passer le fond animé
const contentWrapperStyle = {
  position: 'relative',
  zIndex: 10,                      // Reste bien au-dessus des bulles d'animation
  width: '100%',
  maxWidth: '800px',
  textAlign: 'center',
};

const titleStyle = { 
  fontSize: '3rem', 
  fontWeight: '800', 
  color: '#212529',               // Texte sombre Bootstrap
  marginBottom: '15px',
  letterSpacing: '-1px'
};

const subtitleStyle = { 
  fontSize: '1.2rem', 
  color: '#495057',               // Un gris un poil plus soutenu pour rester lisible sur le fond coloré
  lineHeight: '1.6', 
  marginBottom: '25px',
  maxWidth: '600px',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const btnPrimaryStyle = { 
  padding: '12px 28px', 
  backgroundColor: '#0d6efd',     // Bleu Bootstrap 5
  color: '#ffffff', 
  border: 'none', 
  borderRadius: '8px', 
  fontSize: '1.1rem', 
  fontWeight: '600', 
  cursor: 'pointer',
  transition: 'background-color 0.15s ease-in-out, transform 0.1s ease',
};