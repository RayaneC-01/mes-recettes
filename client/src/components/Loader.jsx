export default function Loader() {
  return (
    <div style={containerStyle}>
      <div style={spinnerStyle}></div>
      <p style={textStyle}>Chargement des délicieuses recettes...</p>
      
      {/* Animation CSS injectée directement */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

// Styles du loader
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "40px 0",
  width: "100%",
};

const spinnerStyle = {
  width: "48px",
  height: "48px",
  border: "5px solid #e9ecef",
  borderTop: "5px solid #0d6efd", // Couleur principale
  borderRadius: "50%",
  animation: "spin 1s linear infinite",
};

const textStyle = {
  marginTop: "16px",
  fontSize: "1.1rem",
  color: "#495057",
  fontWeight: "500",
};