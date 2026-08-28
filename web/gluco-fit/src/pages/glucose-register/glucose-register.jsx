import { GlucoseForm } from "../../components/glucose/index";
import PageLayout from "../../components/layout/page-layout/page-layout";
import registerMobile from "../../assets/registro-image.png";

function GlucoseRegister() {
  return (
    <PageLayout>
      <div className="container py-4">
        <h1
          className="fw-bold mb-4 text-center text-dark"
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontSize: 45,
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <img
            src={registerMobile}
            alt="registro-mobile"
            style={{
              maxWidth: "600px",
              height: "auto",
              
            }}
          />
        </h1>

        {/* Formulario para crear nuevo registro */}
        <GlucoseForm />
      </div>
    </PageLayout>
  );
}

export default GlucoseRegister;
