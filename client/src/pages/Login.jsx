// 1. ZONE DES IMPORTS
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Login() {
  // 2. CORPS DU COMPOSANT
  
  // On récupère la fonction login, mais AUSSI les états error et loading du Contexte
  const { login, error: contextError, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // On envoie les identifiants (credentials) attendus par ton AuthContext
    const success = await login({ email, password });

    // Si la fonction login de ton contexte renvoie true (connexion réussie)
    if (success) {
      navigate('/');
    }
  };

  // 3. AFFICHAGE DU FORMULAIRE
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Connexion à votre espace</h2>

        {/* On utilise ici "contextError" qui vient directement de ton AuthContext */}
        {contextError && (
          <div style={styles.errorBanner}>
            {contextError}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>Adresse Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              disabled={loading} // Désactive le champ pendant le chargement
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="password" style={styles.label}>Mot de passe :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
              disabled={loading} // Désactive le champ pendant le chargement
              required
            />
          </div>

          {/* Le bouton change de texte et se désactive si la requête est en cours */}
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}

// 4. LES STYLES CSS (Objets JavaScript pour le style React)
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '80vh',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    borderRadius: '10px',
    backgroundColor: '#ffffff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333333',
  },
  errorBanner: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    border: '1px solid #f5c6cb',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
  },
  formGroup: {
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: '5px',
    fontSize: '14px',
    color: '#555555',
    fontWeight: 'bold',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #cccccc',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    color: '#ffffff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontWeight: 'bold',
    marginTop: '10px',
  },
};

// 5. EXPORTATION
export default Login;