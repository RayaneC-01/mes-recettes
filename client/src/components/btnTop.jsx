//Bouton scroll vers le haut smooth au clic
import { useState, useEffect } from "react";

export default function BtnTop() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="btn-top">
      {isVisible && (
        <button onClick={scrollToTop} style={btnStyle}>
          ↑
        </button>
      )}
    </div>
  );
}

const btnStyle = {
  position: "fixed",
  bottom:  "60px",
  right: "60px",
  backgroundColor: "#ff6f61",
  color: "#fff",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  fontSize: "1.5rem",
  cursor: "pointer",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  transition: "background-color 0.3s ease",
};
