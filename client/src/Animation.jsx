import { useState } from "react";

function Animation() {
  // On génère les cercles directement à l'initialisation de l'état (Lazy Initialization)
  const [circles] = useState(() => {
    return Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      size: Math.random() * 300 + 250, // Diamètre entre 250px et 550px
      left: Math.random() * 100, // Position de départ X en %
      top: Math.random() * 100, // Position de départ Y en %
      // Palette de couleurs modernes et gourmandes
      color: [
        "#ff7675",
        "#74b9ff",
        "#a29bfe",
        "#55efc4",
        "#ffeaa7",
        "#fd79a8",
        "#e17055",
        "#fab1a4",
        "#81ecec",
        "#6e00",
        "#dfe6e9",
        "#00b894",
        "#fdcb6e",
        "#e84393",
        "#0984e3",
      ][i % 15],
      delay: i * 1.5, // Décalage pour que l'animation soit asynchrone
      duration: 12 + i * 3, // Vitesse de déplacement propre à chaque bulle
    }));
  });

  return (
    <>
      {/* Injection des images clés d'animation CSS directement en JSX */}
      <style>{`
        @keyframes auroraFloat {
          0% { transform: translateY(0px) translateX(0px) scale(1) rotate(0deg); }
          22% { transform: translateY(-30px) translateX(20px) scale(1.05) rotate(60deg); }
          33% { transform: translateY(-50px) translateX(30px) scale(1.1) rotate(120deg); }
          44% { transform: translateY(-30px) translateX(20px) scale(1.05) rotate(180deg); }
          55% { transform: translateY(0px) translateX(0px) scale(1) rotate(240deg); }
          66% { transform: translateY(20px) translateX(-40px) scale(0.95) rotate(240deg); }
          88% { transform: translateY(10px) translateX(-20px) scale(0.98) rotate(300deg); }
          100% { transform: translateY(0px) translateX(0px) scale(1) rotate(360deg); }
        }
      `}</style>

      {/* Conteneur global en arrière-plan fixe qui prend tout l'écran */}
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
              filter: "blur(90px)", // Fusionne les couleurs pour un rendu ultra-doux
              opacity: 0.35, // Reste discret pour ne pas gêner la lecture des textes
              pointerEvents: "none", // Laisse passer les clics à travers
              animation: `auroraFloat ${circle.duration}s ease-in-out infinite alternate`,
              animationDelay: `${circle.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}

// Style du conteneur parent (placé tout au fond)
const backgroundWrapperStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  overflow: "hidden",
  zIndex: 1, // Reste derrière le contenu écrit (qui sera en zIndex: 2 ou plus)
  pointerEvents: "none",
};

export default Animation;