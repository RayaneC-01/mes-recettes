// 1. ZONE DES IMPORTS
import { Link, useNavigate } from "react-router-dom"; // 1. Importer useNavigate
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // 2. Initialiser le hook de navigation
  const [isHovered, setIsHovered] = useState(false);

  // État pour ouvrir/fermer le menu sur mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fonction pour gérer la déconnexion et la redirection
  const handleLogout = () => {
    logout();             // Déconnecte l'utilisateur
    navigate("/");         // Redirige immédiatement vers l'Accueil !
  };
  
  return (
    <nav style={navbarStyle}>
      {/* Zone du Logo */}
      <div style={navbarLogoStyle}>
        <Link to="/" style={navbarLogoLinkStyle} onClick={() => setIsMenuOpen(false)}>
          MesRecettes <span style={logoEmojiStyle}>🍳</span>
        </Link>
      </div>

      {/* Bouton Hamburger (Bouton responsive pour mobile) */}
      <button
        style={hamburgerBtnStyle}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        {isMenuOpen ? "✖" : "☰"}
      </button>

      {/* Zone des Liens (Adaptative) */}
      <div
        style={{
          ...navbarLinksStyle,
          // Si le menu mobile est ouvert, on l'affiche en bloc vertical
          ...(isMenuOpen ? mobileMenuOpenStyle : {}),
        }}
      >
        <Link to="/" style={navbarLinkStyle} onClick={() => setIsMenuOpen(false)}>
          Accueil
        </Link>

        {/* CONDITION "IF" : Connecté */}
        {user ? (
          <>
            <Link to="/ajouter" style={navbarLinkStyle} onClick={() => setIsMenuOpen(false)}>
              Ajouter une recette
            </Link>

            <div style={userBadgeStyle}>
              <span style={userIconStyle}>👨‍🍳</span>
              <span>{user.username}</span>
            </div>

            <button
              onClick={handleLogout}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={isHovered ? btnLogoutHoverStyle : btnLogoutStyle}
            >
              Déconnexion
            </button>
          </>
        ) : (
          /* CONDITION "ELSE" : Déconnecté */
          <>
            <Link to="/login" style={navbarLinkStyle} onClick={() => setIsMenuOpen(false)}>
              Connexion
            </Link>
            <Link to="/register" style={btnRegisterStyle} onClick={() => setIsMenuOpen(false)}>
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

// ==========================================
// OBJETS DE STYLE CSS RESPONSIVE EN JSX
// ==========================================
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
  borderBottom: "1px solid #f1f5f9",
  fontFamily: '"Poppins", "Inter", "Segoe UI", sans-serif',
  position: "sticky",
  top: 0,
  zIndex: 1000,
  width: "100%",
  boxSizing: "border-box", // Empêche les débordements de largeur
  flexWrap: "wrap", // Permet un passage propre à la ligne sur petit écran
};

const navbarLogoStyle = {
  display: "flex",
  alignItems: "center",
};

const navbarLogoLinkStyle = {
  fontSize: "1.4rem",
  fontWeight: "800",
  color: "#0f172a",
  textDecoration: "none",
  letterSpacing: "-0.5px",
};

const logoEmojiStyle = {
  marginLeft: "4px",
  fontSize: "1.2rem",
};

// Bouton Hamburger visible pour les petits écrans
const hamburgerBtnStyle = {
  background: "none",
  border: "none",
  fontSize: "1.6rem",
  cursor: "pointer",
  color: "#0f172a",
  padding: "4px 8px",
};

const navbarLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
};

// Style qui s'applique uniquement quand le menu mobile est ouvert
const mobileMenuOpenStyle = {
  display: "flex",
  flexDirection: "column",
  width: "100%",
  paddingTop: "15px",
  gap: "15px",
  alignItems: "stretch",
  textAlign: "center",
};

const navbarLinkStyle = {
  textDecoration: "none",
  color: "#64748b",
  fontWeight: "500",
  fontSize: "1rem",
  transition: "color 0.2s ease",
};

const userBadgeStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "6px",
  padding: "6px 14px",
  backgroundColor: "#f1f5f9",
  borderRadius: "20px",
  color: "#334155",
  fontWeight: "600",
  fontSize: "1rem",
};

const userIconStyle = {
  fontSize: "1.1rem",
};

const btnLogoutStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545",
  color: "#ffffff",
  border: "1px solid #dc3545",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "1rem",
  transition: "all 0.15s ease-in-out",
};

const btnLogoutHoverStyle = {
  ...btnLogoutStyle,
  backgroundColor: "#bb2d3b",
  borderColor: "#b62534",
  transform: "translateY(-2px)",
  boxShadow: "0 6px 15px rgba(220, 53, 69, 0.25)",
};

const btnRegisterStyle = {
  textDecoration: "none",
  padding: "8px 18px",
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1rem",
  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)",
  transition: "all 0.2s ease",
};

export default Navbar;