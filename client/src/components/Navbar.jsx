// 1. ZONE DES IMPORTS
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useState } from "react";
function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <nav style={navbarStyle}>
      {/* Zone du Logo */}
      <div style={navbarLogoStyle}>
        <Link to="/" style={navbarLogoLinkStyle}>
          MesRecettes <span style={logoEmojiStyle}>🍳</span>
        </Link>
      </div>

      {/* Zone des Liens */}
      <div style={navbarLinksStyle}>
        <Link to="/" style={navbarLinkStyle}>
          Accueil
        </Link>

        {/* CONDITION "IF" : Connecté */}
        {user ? (
          <>
            <Link to="/add-recipe" style={navbarLinkStyle}>
              Ajouter une recette
            </Link>

            <div style={userBadgeStyle}>
              <span style={userIconStyle}>👨‍🍳</span>
              <span>{user.username}</span>
            </div>

            <button
              onClick={logout}
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
            <Link to="/login" style={navbarLinkStyle}>
              Connexion
            </Link>
            <Link to="/register" style={btnRegisterStyle}>
              Inscription
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

// ==========================================
// OBJETS DE STYLE CSS ULTRA-MODERNES
// ==========================================
const navbarStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 40px",
  backgroundColor: "#ffffff",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)", // Ombre douce sous la barre
  borderBottom: "1px solid #f1f5f9",
  fontFamily: '"Poppins", "Inter", "Segoe UI", sans-serif',
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const navbarLogoStyle = {
  display: "flex",
  alignItems: "center",
};

const navbarLogoLinkStyle = {
  fontSize: "1.5rem",
  fontWeight: "800",
  color: "#0f172a", // Couleur ardoise très sombre moderne
  textDecoration: "none",
  letterSpacing: "-0.5px",
};

const logoEmojiStyle = {
  marginLeft: "4px",
  fontSize: "1.2rem",
};

const navbarLinksStyle = {
  display: "flex",
  alignItems: "center",
  gap: "24px", // Espacement parfait entre les éléments
};

const navbarLinkStyle = {
  textDecoration: "none",
  color: "#64748b", // Couleur grise douce pour les liens secondaires
  fontWeight: "500",
  fontSize: "1.1rem",
  transition: "color 0.2s ease",
};

// Petit badge gris élégant pour le profil utilisateur
const userBadgeStyle = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 14px",
  backgroundColor: "#f1f5f9",
  borderRadius: "20px",
  color: "#334155",
  fontWeight: "600",
  fontSize: "1.1rem",
};

const userIconStyle = {
  fontSize: "1.1rem",
};

// Style de base (Bouton rouge Bootstrap classique)
const btnLogoutStyle = {
  padding: "8px 16px",
  backgroundColor: "#dc3545", // Le rouge officiel Bootstrap
  color: "#ffffff",
  border: "1px solid #dc3545",
  borderRadius: "6px", // Arrondi propre Bootstrap 5
  cursor: "pointer",
  fontWeight: "500",
  fontSize: "1.1rem",
  transition:
    "background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out, transform 0.15s ease-in-out",
};

// Style au survol (Bouton rouge Bootstrap plus foncé + ombre légère)
const btnLogoutHoverStyle = {
  ...btnLogoutStyle,
  backgroundColor: "#bb2d3b", // Rouge survol officiel Bootstrap
  borderColor: "#b62534",
  transform: "translateY(-3px)", // Micro-interaction moderne
  boxShadow: "0 10px 19px rgba(220, 53, 69, 0.25)", // Halo lumineux rouge
};

const btnRegisterStyle = {
  textDecoration: "none",
  padding: "8px 18px",
  backgroundColor: "#4f46e5", // Superbe violet/bleu moderne (Indigo)
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "1.3rem",
  boxShadow: "0 4px 12px rgba(79, 70, 229, 0.2)", // Ombre portée lumineuse
  transition: "all 0.2s ease",
};

export default Navbar;
