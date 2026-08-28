import PageLayout from "../../components/layout/page-layout/page-layout";
import imageMobile from "../../assets/gluco-fit-mobile.png"
import registerMobile from "../../assets/registro-image.png"
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <PageLayout>
        {/* 2. Contenido de la Homepage superpuesto */}
        <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
          <h1 className="text-secondary" style={{ 
            fontFamily: "Allura, cursive", 
            fontSize: "64px", 
            lineHeight: "1.1"}}>

            <strong>GlucoFit</strong>
            </h1>
          <p className="lead text-dark" style={{ 
            fontFamily: "Allura, cursive", 
            fontSize: "28px", 
            lineHeight: "1.1"}}>
            Tu plataforma de control de salud, glucosa y dieta.
          </p>
          {/* Contenedor fijo que apila las imágenes en la esquina inferior derecha */}
        <div 
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px" // Espacio entre el texto/flecha y el móvil
          }}
        >
          <img 
            src={registerMobile} 
            alt="registro-mobile" 
            style={{
              maxWidth: "230px",
              height: "auto"
            }}
          />
          <Link to="/registro">
          <img 
            src={imageMobile} 
            alt="image-mobile" 
            style={{
              maxWidth: "150px",
              height: "auto"
            }}
          />

          </Link>
          
        </div>
        </div>
      </PageLayout>
    </>
  );
}

export default HomePage;
