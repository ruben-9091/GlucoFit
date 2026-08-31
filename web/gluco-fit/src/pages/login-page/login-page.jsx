import { LoginForm } from "../../components/auth";
import PageLayout from "../../components/layout/page-layout/page-layout.jsx";

function LoginPage() {
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
        ></h1>

        {/* Formulario para crear nuevo registro */}
        <LoginForm />
      </div>
    </PageLayout>
  );
}

export default LoginPage;
