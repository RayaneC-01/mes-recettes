// Champ de recherche par nom (Props: value, onChange)
export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Rechercher une recette..."
      value={value}
      onChange={onChange} 
      style={searchBarStyle}
    />
  );
}

const searchBarStyle = {
  padding: "10px",
  width: "100%",
  maxWidth: "400px",
  borderRadius: "5px",
  border: "1px solid #ccc",
  fontSize: "16px",
  marginBottom: "20px",
};