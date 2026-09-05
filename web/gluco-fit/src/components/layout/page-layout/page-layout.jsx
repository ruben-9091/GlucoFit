
import { ParticlesBackground, Jumbotron } from "../../../components/ui/index";
import Footer from "../../ui/footer/footer";

function PageLayout({ children, jumbotron, className = "" }) {
  return (
    <>
      {/* Fondo animado global */}
      <ParticlesBackground />

      {/* Contenido de la página */}
      <div className="d-flex flex-column min-vh-100 position-relative" style={{ zIndex: 1 }}>
         {jumbotron && <Jumbotron {...jumbotron} />}

        <div className={`container py-3 ${className} flex-grow-1`}>
          {children}
        </div>

      <Footer/>
      </div>
    </>
  );
}

export default PageLayout;
