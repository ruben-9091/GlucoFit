import Aurora from "../aurora/aurora";
import "./aurora-background.css";

// Fondo animado global. Se monta una sola vez en App.jsx, fuera de <Routes>,
// para que no se reinicie (ni repita el intro) al navegar.
function AuroraBackground() {
  return (
    <div className="aurora-background" aria-hidden="true">
      <Aurora
        colorStops={["#63212a", "#cd8d27", "#a29f9e"]}
        lightMode
        opacity={0.75}
        glow={0.5}
        speed={0.5}
        amplitude={1}
        blend={0.6}
        height={1}
        layers={1}
        dpr={1}
        intro
      />
    </div>
  );
}

export default AuroraBackground;
