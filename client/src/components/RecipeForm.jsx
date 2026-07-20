import { useState, useEffect } from "react";

export default function RecipeForm({ initialData, onSubmit }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "Entrée",
    prepTime: "",
    ingredients: "",
    instructions: "",
    image: "",
  });

  const categories = ["Entrée", "Plat", "Dessert", "Boisson", "Autre"];

  // Si on est en mode modification, on pré-remplit les champs
  useEffect(() => {
    if (initialData) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: initialData.title || "",
        category: initialData.category || "Entrée",
        prepTime: initialData.prepTime || "",
        ingredients: initialData.ingredients || "",
        instructions: initialData.instructions || "",
        image: initialData.image || "",
      });
    }
  }, [initialData]);

  // Met à jour l'état quand l'utilisateur tape dans un champ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      prepTime: Number(formData.prepTime), // On s'assure que c't un nombre
    });
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      {/* Titre */}
      <div style={groupStyle}>
        <label style={labelStyle}>Titre de la recette *</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          style={inputStyle}
          placeholder="ex: Cookies aux pépites de chocolat"
        />
      </div>

      {/* Catégorie & Temps de préparation */}
      <div style={rowStyle}>
        <div style={{ ...groupStyle, flex: 1 }}>
          <label style={labelStyle}>Catégorie *</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={inputStyle}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div style={{ ...groupStyle, flex: 1 }}>
          <label style={labelStyle}>Temps (min) *</label>
          <input
            type="number"
            name="prepTime"
            value={formData.prepTime}
            onChange={handleChange}
            required
            min="1"
            style={inputStyle}
            placeholder="ex: 25"
          />
        </div>
      </div>

      {/* Image (URL) */}
      <div style={groupStyle}>
        <label style={labelStyle}>URL de l'image (optionnel)</label>
        <input
          type="url"
          name="image"
          value={formData.image}
          onChange={handleChange}
          style={inputStyle}
          placeholder="https://images.unsplash.com/..."
        />
      </div>

      {/* Ingrédients */}
      <div style={groupStyle}>
        <label style={labelStyle}>Ingrédients *</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
          rows="4"
          style={textareaStyle}
          placeholder="Farine, sucre, œuf, pépites de chocolat..."
        />
      </div>

      {/* Instructions */}
      <div style={groupStyle}>
        <label style={labelStyle}>Instructions *</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          rows="5"
          style={textareaStyle}
          placeholder="1. Préchauffer le four...&#10;2. Mélanger la farine..."
        />
      </div>

      {/* Bouton dynamique */}
      <button type="submit" style={submitButtonStyle}>
        {initialData ? "Sauvegarder les modifications" : "Créer la recette"}
      </button>
    </form>
  );
}

// Styles simples
const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "15px",
  maxWidth: "600px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  padding: "25px",
  borderRadius: "10px",
  boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
};

const groupStyle = {
  display: "flex",
  flexDirection: "column",
  textAlign: "left",
};

const rowStyle = {
  display: "flex",
  gap: "15px",
};

const labelStyle = {
  fontWeight: "600",
  marginBottom: "5px",
  color: "#333",
};

const inputStyle = {
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #ced4da",
  fontSize: "0.95rem",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical",
};

const submitButtonStyle = {
  padding: "12px",
  backgroundColor: "#0d6efd",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "1rem",
  fontWeight: "bold",
  cursor: "pointer",
  marginTop: "10px",
};