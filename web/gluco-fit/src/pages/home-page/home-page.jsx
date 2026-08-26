import PageLayout from "../../components/layout/page-layout/page-layout";


function HomePage() {
  return (
    <>
      <PageLayout>
      
        {/* 2. Contenido de la Homepage superpuesto */}
        <div className="container py-5 position-relative" style={{ zIndex: 1 }}>
          <h1 className="fw-bold">GlucoFit</h1>
          <p className="lead">
            Tu plataforma de control de salud, glucosa y dieta.
          </p>
        </div>


      </PageLayout>

    </>
  );
}

export default HomePage;
