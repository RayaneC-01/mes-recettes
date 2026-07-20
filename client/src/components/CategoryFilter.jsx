// Boutons ou select pour filtrer par catégorie Props (selected,OnChange)

export default function CategoryFilter({ selected, onChange }) {
  // Le tableau des catégories
  const categories = ["Toutes", "Entrée", "Plat", "Dessert", "Boisson"];

  return (
    <div style={categoryTabsStyle}>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onChange(category)} 
          style={{
            ...categoryButtonStyle,
            backgroundColor: selected === category ? "#0d6efd" : "#ffffff",
            color: selected === category ? "#ffffff" : "#495057",
            border: selected === category ? "1px solid #0d6efd" : "1px solid #ced4da",
          }}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

// Styles
const categoryTabsStyle = {
  display: "flex",
  gap: "8px",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: "30px",
};

const categoryButtonStyle = {
  padding: "6px 14px",
  borderRadius: "16px",
  fontWeight: "600",
  cursor: "pointer",
  transition: "all 0.2s ease",
};