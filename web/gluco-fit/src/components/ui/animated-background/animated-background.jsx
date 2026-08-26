import { useEffect, useRef } from 'react';

function AnimatedBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let vantaEffect = null;

    // 1. Cargar Three.js dinámicamente
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };

    // 2. Cargar dependencias en orden y ejecutar Vanta
    Promise.all([
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js')
    ])
      .then(() => loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js'))
      .then(() => {
        if (window.VANTA && vantaRef.current && !vantaEffect) {
          vantaEffect = window.VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: 0xf7f4ef,
            color1: 0xa48842,
            color2: 0x212529,
            quantity: 4.00,
            birdSize: 1.20,
            wingSpan: 20.00,
            speedLimit: 4.00
          });
        }
      })
      .catch((err) => console.error("Error al cargar Vanta scripts:", err));

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, []);

  return (
    <div 
      ref={vantaRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, // Cambiado a 0 por si el body tapaba el zIndex: -1
        pointerEvents: 'none' // Permite interactuar con los botones de la web
      }}
    />
  );
}

export default AnimatedBackground;