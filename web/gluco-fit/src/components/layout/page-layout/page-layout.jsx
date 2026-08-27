
import { ParticlesBackground } from "../../../components/ui/index";

function PageLayout({ children, className = "" }) {
  return (
    <>
      {/* Fondo animado global */}
      <ParticlesBackground />

      {/* Contenido de la página */}
      <div className="d-flex flex-column min-vh-100 position-relative" style={{ zIndex: 1 }}>
        

        <div className={`container py-3 ${className} flex-grow-1`}>
          {children}
        </div>

      
      </div>
    </>
  );
}

export default PageLayout;
