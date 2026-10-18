import PageLayout from "../../components/layout/page-layout/page-layout";
import imageMobile from "../../assets/gluco-fit-mobile.png";
import registerMobile from "../../assets/registro-image.png";
import glucoFitVideo from "../../assets/gluco-fit-video.mp4";
import { GradientText } from "../../components/ui";
import { Link } from "react-router-dom";
import canalDiabetesImg from "../../assets/canal-diabetes.jpg";
import seDiabetesImg from "../../assets/sociedad-diabetes.png";
import sanidadImg from "../../assets/ministerio-sanidad.jpg";
import "./home-page.css"; // 🔥 Añade este CSS para animaciones y estilos

// Paleta del tema, compartida por los GradientText de la página
const THEME_STOPS = ["#63212a", "#cd8d27", "#a29f9e"];

function HomePage() {
  return (
    <>
      <PageLayout jumbotron={{ video: glucoFitVideo }}>
        <div className="container py-5" style={{ zIndex: 1 }}>
          <div className="row align-items-start g-4">
            {/* Columna Izquierda */}
            <div className="col-12 col-lg-7 d-flex flex-column align-items-start gap-5">
              <GradientText
                colors={THEME_STOPS}
                variant="linear"
                angle={90}
                animationSpeed={6}
                yoyo
                glow={0.25}
                style={{ justifyContent: "flex-start" }}
              >
                <div className="gf-logo">
                  <span className="gf-logo__title">GlucoFit</span>
                  <span className="gf-logo__subtitle">
                    Tu plataforma de control de salud, glucosa y dieta
                  </span>
                </div>
              </GradientText>

              {/* Bloque Moderno */}
              <div className="modern-card mt-4 pe-lg-4 fade-in">
                <GradientText
                  colors={THEME_STOPS}
                  variant="linear"
                  angle={90}
                  animationSpeed={6}
                  yoyo
                  glow={0.25}
                  className="mb-3"
                  style={{ justifyContent: "flex-start" }}
                >
                  <h2 className="modern-title m-0">
                    Tu salud, tu control, tu bienestar
                  </h2>
                </GradientText>

                <p
                  className="modern-text"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "25px",
                  }}
                >
                  Registra tus valores de <strong>glucemia e insulina</strong>,
                  descubre recetas fáciles y saludables, bajas en azúcares, y
                  encuentra rutinas de ejercicio pensadas para ayudarte a
                  mantener un estilo de vida activo.
                </p>

                <p
                  className="modern-text"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "25px",
                  }}
                >
                  <strong>GlucoFit</strong> reúne salud, alimentación y
                  ejercicio en un mismo lugar para ayudarte a cuidarte cada día.
                </p>

                <p
                  className="modern-text"
                  style={{
                    fontFamily: "'Outfit', sans-serif",
                    fontSize: "25px",
                  }}
                >
                  Vive con energía y bienestar, con una plataforma que
                  evoluciona contigo.
                </p>
              </div>

              {/* Enlaces de interés */}
              <div
                className="mt-5 w-100 pe-lg-4 text-center"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: "25px",
                }}
              >
                <h4 className="fw-bold mb-3" style={{ color: "#4d171a" }}>
                  Enlaces de interés
                </h4>
                <div className="row g-3 text-center">
                  <div className="col-4">
                    <a
                      href="https://canaldiabetes.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-block text-decoration-none"
                    >
                      <img
                        src={canalDiabetesImg}
                        alt="Canal Diabetes"
                        className="img-fluid rounded shadow-sm hover-zoom"
                        style={{ maxHeight: "90px", objectFit: "contain" }}
                      />
                      <small className="d-block mt-2 text-muted fw-semibold">
                        Canal Diabetes
                      </small>
                    </a>
                  </div>
                  <div className="col-4">
                    <a
                      href="https://www.sediabetes.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-block text-decoration-none"
                    >
                      <img
                        src={seDiabetesImg}
                        alt="Sociedad Española de Diabetes"
                        className="img-fluid rounded shadow-sm hover-zoom"
                        style={{ maxHeight: "90px", objectFit: "contain" }}
                      />
                      <small className="d-block mt-2 text-muted fw-semibold">
                        SEDiabetes
                      </small>
                    </a>
                  </div>
                  <div className="col-4">
                    <a
                      href="https://www.sanidad.gob.es/ciudadanos/enfLesiones/enfNoTransmisibles/diabetes/diabetes.htm"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="d-block text-decoration-none"
                    >
                      <img
                        src={sanidadImg}
                        alt="Ministerio de Sanidad - Diabetes"
                        className="img-fluid rounded shadow-sm hover-zoom"
                        style={{ maxHeight: "90px", objectFit: "contain" }}
                      />
                      <small className="d-block mt-2 text-muted fw-semibold">
                        Min. de Sanidad
                      </small>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="col-12 col-lg-5 d-flex flex-column align-items-center align-items-lg-end">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <img
                  src={registerMobile}
                  alt="registro-mobile"
                  style={{ maxWidth: "230px", height: "auto" }}
                />
                <Link to="/register">
                  <img
                    src={imageMobile}
                    alt="image-mobile"
                    style={{ maxWidth: "150px", height: "auto" }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}

export default HomePage;
