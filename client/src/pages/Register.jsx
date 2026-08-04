import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { registerUser } from "../services/api";

function Register() {
  const navigate = useNavigate();
  // Extraction propre de la fonction login depuis le contexte
  const { login } = useContext(AuthContext);

  // État pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // État pour gérer les erreurs, le chargement et l'affichage des mots de passe
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Fonction pour gérer les changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation des champs du formulaire
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password
    ) {
      setError("Tous les champs obligatoires doivent être remplis.");
      return;
    }

    // Validation de la longueur du mot de passe
    if (formData.password.length < 6 || formData.password.length > 20) {
      setError("Le mot de passe doit contenir entre 6 et 20 caractères.");
      return;
    }

    // Validation de la correspondance des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

      // ÉTAPE 1 : Requête d'inscription via le service d'API (Render)
      const response = await registerUser({
        firstName: formData.firstName,
        lastName: formData.lastName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (response.message && !response._id && !response.id) {
        throw new Error(
          response.message || "Une erreur est survenue lors de l'inscription."
        );
      }

      // ÉTAPE 2 : Connexion automatique via le Contexte
      const success = await login({
        email: formData.email,
        password: formData.password,
      });

      if (!success) {
        throw new Error(
          "Compte créé, mais la connexion automatique a échoué. Veuillez vous connecter manuellement."
        );
      }

      // ÉTAPE 3 : Redirection vers la page d'accueil
      navigate("/");

      // ÉTAPE 4 : Remise à zéro du formulaire
      setFormData({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.message || "Erreur lors de la création du compte.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Créer un compte 👨‍🍳</h2>

        {error && <div style={errorAlertStyle}>{error}</div>}

        <div style={rowStyle}>
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Prénom</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Jean"
            />
          </div>

          <div style={inputGroupStyle}>
            <label style={labelStyle}>Nom</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={inputStyle}
              placeholder="Dupont"
            />
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={inputStyle}
            placeholder="ChefGourmet"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Adresse Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
            placeholder="chef@example.com"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Téléphone (optionnel)</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={inputStyle}
            placeholder="0612345678"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Mot de passe (6-20 caractères)</label>
          <div style={inputContainerStyle}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={inputWithBtnStyle}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={eyeButtonStyle}
            >
              {showPassword ? "Masquer" : "Afficher"}
            </button>
          </div>
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Confirmer le mot de passe</label>
          <div style={inputContainerStyle}>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              style={inputWithBtnStyle}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={eyeButtonStyle}
            >
              {showConfirmPassword ? "Masquer" : "Afficher"}
            </button>
          </div>
        </div>

        <div style={NewAccountStyle}>
          <p>
            Déjà un compte ?{" "}
            <Link to="/login" style={linkStyle}>
              Connectez-vous ici
            </Link>
          </p>
        </div>

        <button type="submit" disabled={loading} style={btnPrimaryStyle}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

// ==========================================
// STYLES CSS AJUSTÉS
// ==========================================
const containerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "calc(100vh - 70px)",
  padding: "40px 20px",
  fontFamily: "system-ui, -apple-system, sans-serif",
};

const formStyle = {
  backgroundColor: "#ffffff",
  padding: "30px",
  borderRadius: "12px",
  boxShadow: "0 4px 24px rgba(0, 0, 0, 0.05)",
  border: "1px solid #dee2e6",
  width: "100%",
  maxWidth: "500px",
};

const titleStyle = {
  textAlign: "center",
  color: "#212529",
  marginBottom: "25px",
  fontWeight: "700",
};

const rowStyle = {
  display: "flex",
  gap: "15px",
};

const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  marginBottom: "15px",
  width: "100%",
};

const labelStyle = { fontSize: "0.9rem", fontWeight: "600", color: "#495057" };

const inputStyle = {
  padding: "10px 14px",
  border: "1px solid #ced4da",
  borderRadius: "6px",
  fontSize: "1rem",
  color: "#212529",
  width: "100%",
  boxSizing: "border-box",
};

const inputContainerStyle = {
  position: "relative",
  display: "flex",
  alignItems: "center",
  width: "100%",
};

const inputWithBtnStyle = {
  padding: "10px 85px 10px 14px",
  border: "1px solid #ced4da",
  borderRadius: "6px",
  fontSize: "1rem",
  color: "#212529",
  width: "100%",
  boxSizing: "border-box",
};

const errorAlertStyle = {
  padding: "12px",
  backgroundColor: "#f8d7da",
  color: "#842029",
  border: "1px solid #f5c2c7",
  borderRadius: "6px",
  marginBottom: "20px",
  fontSize: "0.95rem",
  fontWeight: "500",
};

const btnPrimaryStyle = {
  width: "100%",
  padding: "12px",
  backgroundColor: "#0d6efd",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "600",
  cursor: "pointer",
  marginTop: "10px",
};

const eyeButtonStyle = {
  position: "absolute",
  right: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  background: "none",
  border: "none",
  color: "#0d6efd",
  cursor: "pointer",
  fontSize: "0.85rem",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.5px",
  padding: "4px 8px",
  borderRadius: "4px",
};

const NewAccountStyle = {
  textAlign: "center",
  marginBottom: "15px",
  fontSize: "1rem",
};

const linkStyle = {
  color: "#0d6efd",
  textDecoration: "none",
  fontWeight: "600",
};

export default Register;