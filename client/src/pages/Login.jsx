import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
// Importation du contexte pour gérer l'authentification
import { AuthContext } from "../context/AuthContext"; 

function Login() {
  // Utilisation de useNavigate pour rediriger après la connexion
  const navigate = useNavigate();
  // Récupération de la fonction login depuis le contexte AuthContext
  const { login } = useContext(AuthContext); 

  // États pour les champs, les erreurs et le chargement
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  // État pour afficher/masquer le mot de passe
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("L'email et le mot de passe sont obligatoires.");
      return;
    }

    try {
      setLoading(true);

      // On utilise la fonction login du contexte
      // Elle se charge de faire le fetch, de stocker les données et de mettre à jour l'état global
      const success = await login({ email, password });

      if (!success) {
        throw new Error("Email ou mot de passe incorrect.");
      }

      // Connexion réussie ! Redirection vers l'accueil
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Connexion 🍳</h2>

        {error && <div style={errorAlertStyle}>{error}</div>}

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Adresse Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
            placeholder="chef@example.com"
          />
        </div>

        {/* Bloc Mot de passe sécurisé avec bouton intégré */}
        <div style={inputGroupStyle}>
          <label style={labelStyle}>Mot de passe</label>
          <div style={inputContainerStyle}>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

        <button type="submit" disabled={loading} style={btnPrimaryStyle}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
}

// ==========================================
// STYLES CSS (Identiques à Register)
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
  maxWidth: "450px",
};

const titleStyle = {
  textAlign: "center",
  color: "#212529",
  marginBottom: "25px",
  fontWeight: "700",
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

export default Login;