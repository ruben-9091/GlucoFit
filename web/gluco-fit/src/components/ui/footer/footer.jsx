import glucoFitLogo from "../../../assets/gluco-fit-logo.png"


function Footer() {
  // Función rápida para hacer scroll suave hacia arriba (Utilidad real)
  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
   <footer className="w-100 py-4 mt-5 border-top border-secondary"
  style={{
    background: "linear-gradient(90deg, #ddd3d3 0%, #1a1a1a 100%)"
  }}
>
      <div className="container">
        <div className="row align-items-center justify-content-between g-3">
          {/* Lado Izquierdo: Copyright */}
          <div className="col-md-6 text-center text-md-start">
            <p
              className="m-0 text-white fw-bolder tracking-wider"
              style={{ letterSpacing: "1px" }}
            >
              <img src={glucoFitLogo}
              style={{
              maxWidth: "250px",
              height: "auto",
              
            }}
              />
            </p>
            <p
              className="m-0 small text-white mt-1"
              style={{ fontSize: "14px" }}
            >
              © {new Date().getFullYear()}. Las marcas, logotipos y contenidos
              multimedia son propiedad de sus respectivos titulares.
            </p>
          </div>

          {/* Lado Derecho: ScrollTop + VisualEffect */}
          <div className="col-md-6 text-center text-md-end">
            <a
              href="#top"
              onClick={scrollToTop}
              className="text-white text-decoration-none small text-uppercase fw-bold me-4 hover-white"
              style={{ fontSize: "14px", transition: "color 0.2s" }}
            >
              ▲ Volver Arriba
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
