import { createContext, useState } from "react";
import { loginUser } from "../services/api";

// 1. Création du contexte
const AuthContext = createContext(null);

// 2. Création du fournisseur de contexte
function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Vérifie si l'utilisateur est déjà connecté en localStorage
    const savedUser = localStorage.getItem("user");
    // Si oui, on le parse et on le retourne, sinon on retourne null
    return savedUser ? JSON.parse(savedUser) : null;
  });
  // 3. Gestion de l'état de chargement et des erreurs
  const [loading, setLoading] = useState(false);
  // 4. Gestion de l'état des erreurs
  const [error, setError] = useState(null);
  // 5. Fonction de connexion
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const data = await loginUser(credentials);

      if (data.message) {
        setError(data.message);
        setLoading(false);
        return false;
      }

      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
      setLoading(false);
      return true;
    // eslint-disable-next-line no-unused-vars
    } catch (catchError) {
      setError("Une erreur réseau est survenue.");
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

// Export par défaut pour le contexte et le fournisseur
export { AuthContext, AuthProvider };