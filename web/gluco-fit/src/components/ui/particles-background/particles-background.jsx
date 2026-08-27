import { useCallback } from "react";
import Particles from "react-particles";
import { loadSlim } from "tsparticles-slim";

export default function ParticlesBackground() {
  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        // Define que ocupe toda la pantalla al fondo de la pila Z
        fullScreen: {
          enable: true,
          zIndex: -1,
        },
        background: {
          color: { value: "#FDFBF7" },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
          },
          modes: {
            repulse: { distance: 100, duration: 0.4 },
          },
        },
        particles: {
          color: { value: "#403206" },
          links: {
            color: "#cd8d27",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          move: {
            enable: true,
            speed: 2,
          },
          number: {
            value: 60,
          },
          size: {
            value: { min: 1, max: 3 },
          },
        },
      }}
    />
  );
}