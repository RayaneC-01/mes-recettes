import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  // 1. Un seul état pour regrouper tous nos champs de formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "", // Champ bonus essentiel côté client !
  });

  // États pour la gestion des erreurs et du chargement
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Gestion dynamique des changements dans les inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 2. Fonction de soumission avec restrictions strictes
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Restriction A : Vérifier que tous les champs requis sont remplis
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.username ||
      !formData.email ||
      !formData.password ||
      !formData.phone
    ) {
      setError("Tous les champs sont obligatoires.");
      return;
    }

    // Restriction B : Vérifier la longueur du mot de passe avant d'appeler le serveur
    if (formData.password.length < 6 || formData.password.length > 20) {
      setError("Le mot de passe doit contenir entre 6 et 20 caractères.");
      return;
    }

    // Restriction C : Validation de la confirmation du mot de passe
    if (formData.password !== formData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    try {
      setLoading(true);

      // Appel de ton API Backend
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Récupère l'erreur exacte envoyée par ton backend (ex: "Cet email est déjà utilisé")
        throw new Error(
          data.message || "Une erreur est survenue lors de l'inscription.",
        );
      }

      // Si l'inscription réussit, on redirige vers la page de connexion
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <form onSubmit={handleSubmit} style={formStyle}>
        <h2 style={titleStyle}>Créer un compte 🍳</h2>

        {/* Affichage de l'erreur si elle existe */}
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
          <label style={labelStyle}>Téléphone</label>
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
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle}
            placeholder="••••••••"
          />
        </div>

        <div style={inputGroupStyle}>
          <label style={labelStyle}>Confirmer le mot de passe</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            style={inputStyle}
            placeholder="••••••••"
          />
        </div>

        <button type="submit" disabled={loading} style={btnPrimaryStyle}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
}

// ==========================================
// STYLES CLASSIQUES & PROPRES (STYLE BOOTSTRAP)
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
const rowStyle = { display: "flex", gap: "15px", marginBottom: "15px" };
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

export default Register;
