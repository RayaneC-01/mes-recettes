import { useState } from "react";

function Animation() {
  const [circles] = useState(() => {
    // Palette de couleurs "Gourmande & Fraîche" pour fond clair
    const gourmetColors = [
      "#ff8a80", // Pêche mûre (douceur, chaleur)
      "#ffee58", // Miel (chaleur, soleil)
      "#a5d6a7", // Vert Menthe/Basilic très doux (fraîcheur)
      "#f48fb1", // Rose Baie (peps, gourmandise)
      "#ffcc80", // Abricot (chaleur, joie)
      "#81d4fa", // Bleu Ciel (légèreté, propreté)
      "#fff8e1", // Crème (douceur, base)
    ];

    return Array.from({ length: 7 }).map((_, i) => ({
      id: i,
      size: Math.random() * 300 + 400, 
      left: Math.random() * 90 - 5, 
      top: Math.random() * 90 - 5, 
      color: gourmetColors[i % gourmetColors.length],
      // Vitesse douce et apaisante (15s à 25s)
      duration: 15 + Math.random() * 10,
      delay: -(Math.random() * 10), // Décalage immédiat
      // Trajectoire fluide et organique
      animationName: `gourmetFloat${(i % 3) + 1}`,
    }));
  });

  return (
    <>
      {/* Keyframes de mouvements fluides et délicats */}
      <style>{`
        @keyframes gourmetFloat1 {
          0% { transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); }
          33% { transform: translateY(-4vh) translateX(3vw) scale(1.08) rotate(10deg); }
          66% { transform: translateY(3vh) translateX(-2vw) scale(0.95) rotate(-10deg); }
          100% { transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); }
        }

        @keyframes gourmetFloat2 {
          0% { transform: translateY(0px) translateX(0px) scale(1.05) rotate(0deg); }
          33% { transform: translateY(3vh) translateX(-3vw) scale(0.92) rotate(-8deg); }
          66% { transform: translateY(-4vh) translateX(2vw) scale(1.1) rotate(8deg); }
          100% { transform: translateY(0px) translateX(0px) scale(1.05) rotate(0deg); }
        }

        @keyframes gourmetFloat3 {
          0% { transform: translateY(0px) translateX(0px) scale(0.98) rotate(0deg); }
          50% { transform: translateY(-5vh) translateX(0vw) scale(1.15) rotate(5deg); }
          100% { transform: translateY(0px) translateX(0px) scale(0.98) rotate(0deg); }
        }
      `}</style>

      {/* Conteneur global (transparent sur fond clair) */}
      <div style={backgroundWrapperStyle}>
        {circles.map((circle) => (
          <div
            key={circle.id}
            style={{
              position: "absolute",
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              borderRadius: "50%",
              backgroundColor: circle.color,
              left: `${circle.left}%`,
              top: `${circle.top}%`,
              filter: "blur(110px)", // Très grand flou pour un effet "lumière d'ambiance"
              opacity: 0.28, // Discret et subtil pour fond clair
              mixBlendMode: "multiply", // Fusionne délicatement avec un fond clair
              pointerEvents: "none",
              animation: `${circle.animationName} ${circle.duration}s ease-in-out infinite alternate`,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

// Style du conteneur parent 
const backgroundWrapperStyle = {
  position: "fixed", 
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  overflow: "hidden",
  zIndex: 0, 
  pointerEvents: "none",
};

export default Animation;