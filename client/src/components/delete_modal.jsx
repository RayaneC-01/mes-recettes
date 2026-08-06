import { useNavigate, useParams } from "react";
import { BASE_URL } from "../services/api"; // Importation de l'URL Render

export default function DeleteModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { id } = useParams();

  // Si la modale n'est pas ouverte, on ne rend RIEN à l'écran
  if (!isOpen) return null;

  const handleDelete = async () => {
    try {
      // Utilisation de BASE_URL dynamique
      const response = await fetch(`${BASE_URL}/recipes/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Recette supprimée avec succès !");
        onClose(); // Fermer le modal
        navigate("/"); // Redirection vers l'accueil
      } else {
        const data = await response.json();
        alert(data.message || "Erreur lors de la suppression de la recette");
      }
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
      alert("Erreur de connexion au serveur");
    }
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2>Confirmer la suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer cette recette ?</p>
        <div style={buttonContainerStyle}>
          <button style={cancelButtonStyle} onClick={onClose}>
            Annuler
          </button>
          {/* appelle de  la fonction handleDelete ! */}
          <button style={deleteButtonStyle} onClick={handleDelete}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

// STYLES
const modalOverlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};

const modalContentStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "8px",
  width: "90%",
  maxWidth: "400px",
  textAlign: "center",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
};

const buttonContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginTop: "20px",
};

const cancelButtonStyle = {
  backgroundColor: "#6c757d",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
};

const deleteButtonStyle = {
  backgroundColor: "#dc3545",
  color: "#fff",
  border: "none",
  padding: "10px 20px",
  borderRadius: "4px",
  cursor: "pointer",
};