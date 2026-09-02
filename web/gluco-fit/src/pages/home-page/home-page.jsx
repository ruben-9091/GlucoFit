import PageLayout from "../../components/layout/page-layout/page-layout";
import imageMobile from "../../assets/gluco-fit-mobile.png";
import registerMobile from "../../assets/registro-image.png";
//import jumboImg from "../../assets/Jumbotron.jpg";
import glucoFitVideo from "../../assets/gluco-fit-video.mp4"
import glucoFitDescription from "../../assets/gluco-fit-description.png";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <PageLayout
        jumbotron={{
          video: glucoFitVideo,
        }}
      >
        {/* Contenedor que empieza SIEMPRE debajo del Jumbotron */}
        <div className="container py-5" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-4">
            {/* Columna Izquierda: Descripción de GlucoFit (arriba / izquierda) */}
            <div className="col-12 col-lg-7 d-flex justify-content-start align-items-start">
              <img
                src={glucoFitDescription}
                alt="gluco-fit-description"
                style={{
                  maxWidth: "680px",
                  width: "100%",
                  height: "auto",
                }}
              />
            </div>

            {/* Columna Derecha: Imágenes móviles centradas a la derecha que hacen SCROLL */}
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
                  style={{
                    maxWidth: "230px",
                    height: "auto",
                  }}
                />
                <Link to="/glucose/registro">
                  <img
                    src={imageMobile}
                    alt="image-mobile"
                    style={{
                      maxWidth: "150px",
                      height: "auto",
                    }}
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
