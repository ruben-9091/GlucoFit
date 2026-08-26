import { AnimatedBackground } from "../../components/ui";

function HomePage() {
  return (
    <>
      <div className="position-relative min-vh-100 bg-transparent">
        {/* 1. Fondo animado */}
        <AnimatedBackground />

        {/* 2. Contenido de la Homepage superpuesto */}
        <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
          <h1 className="fw-bold">GlucoFit</h1>
          <p className="lead">
            Tu plataforma de control de salud, glucosa y dieta.
          </p>
        </div>
      </div>
    </>
  );
}

export default HomePage;
