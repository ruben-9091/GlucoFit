import Threads from "../threads/threads";
import "./threads-background.css";

// Fondo animado global OPCIONAL. Igual que AuroraBackground: se monta una sola vez
// en App.jsx (fuera de <Routes>) para que no se reinicie al navegar.
//
// Uso en App.jsx:
//   import { ThreadsBackground } from "./components/ui";
//   ...
//   <ThreadsBackground />   // en lugar de <ParticlesBackground /> o <AuroraBackground />
//
// ⚠️ Coste: Threads hace 2 pasadas (render-to-texture + screen) con
// drawArraysInstanced a pantalla completa y mantiene el bucle rAF activo mientras
// anima. Es más caro que las partículas o que Aurora. Si notas tirones:
//   - baja `lineCount` (menos hebras), o
//   - sube `speed` a 0 para congelarlo (el bucle se detiene cuando no hay movimiento).
function ThreadsBackground() {
  return (
    <div className="threads-background" aria-hidden="true">
      <Threads
        // Paleta del tema (acepta strings CSS o [r, g, b] en 0..1)
        color="#63212a"
        accentColor="#cd8d27"
        lineCount={70} // nº de hebras (máx. 400). El principal botón de rendimiento.
        thickness={0.45} // grosor de cada hebra
        amplitude={1.5} // cuánto ondulan
        speed={0.35} // velocidad de deriva (0 = estático)
        softness={1.3} // suavizado de los bordes de cada hebra
        taper={0.85} // desvanecido de las hebras hacia un extremo
        fade={0.22} // difumina los bordes del viewport para que no corte en seco
        opacity={0.45} // opacidad global: bajo para que el texto siga legible
        enableMouseInteraction // las hebras se apartan alrededor del cursor
        parting={0.4} // intensidad de ese "apartarse"
      />
    </div>
  );
}

export default ThreadsBackground;
