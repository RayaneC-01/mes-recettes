// 1. ZONE DES IMPORTS
// Importation des outils de navigation pour changer de page sans recharger
import { Link } from 'react-router-dom';
// Importation du récepteur de données de React
import { useContext } from 'react';
// Importation de la fréquence (Contexte) d'authentification
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  // 2. CORPS DU COMPOSANT
  // Branchement au Contexte : on récupère l'utilisateur et la fonction logout
  const { user, logout } = useContext(AuthContext);

  // 3. AFFICHAGE DE LA NAVBAR
  return (
    <nav style={navbarStyle} className="navbar">
      {/* Zone Fixe Commune (Le Logo) */}
      <div className="navbar-logo">
        <Link to="/">Mes Recettes</Link>
      </div>

      {/* Zone Dynamique */}
      <div style={navbarStyle} className="navbar-links">
        <Link to="/">Accueil</Link>

        {/* CONDITION "IF" : Si l'utilisateur possède des données (il est connecté) */}
        {user ? (
          <>
            {/* Lien Privé */}
            <Link to="/add-recipe">Ajouter une recette</Link>
            
            {/* Texte de Bienvenue avec le pseudo dynamique */}
            <span className="navbar-user">Mon profil : {user.username}</span>
            
            {/* Actionneur de déconnexion au clic */}
            <button onClick={logout} className="btn-logout">
              Déconnexion
            </button>
          </>
        ) : (
          /* CONDITION "ELSE" : Si l'utilisateur est vide (il est déconnecté) */
          <>
            {/* Liens d'Accès et d'Enregistrement */}
            <Link to="/login">Connexion</Link>
            <Link to="/register" className="btn-register">Inscription</Link>
          </>
        )}
      </div>
    </nav>
  );
};

// Style CSS pour la Navbar comme Boostrap

const navbarStyle = `
.navbar {
  display: flex;    
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #dee2e6;
}
.navbar-logo a {
    font-size: 1.5rem;
    font-weight: bold;
    color: #343a40;
    text-decoration: none;
}
.navbar-links a {
    margin-left: 15px;
    color: #343a40;
    text-decoration: none;
}
.navbar-links a:hover {
    text-decoration: underline;
}
.navbar-user {
    margin-left: 15px;
    font-weight: bold;
}
.btn-logout {
    margin-left: 15px;
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-logout:hover {
    background-color: #c82333;
}
.btn-register {
    margin-left: 15px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.btn-register:hover {
    background-color: #0056b3;
}
`;

// 4. EXPORTATION
export default Navbar;