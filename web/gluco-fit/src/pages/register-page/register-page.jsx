import { RegisterForm } from "../../components/auth/index.js";
import PageLayout from "../../components/layout/page-layout/page-layout.jsx";
import registerMobile from "../../assets/registro-image.png";


function RegisterPage () {
    return(
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
        <RegisterForm />
      </div>
        </PageLayout>
    )
}

export default RegisterPage; 