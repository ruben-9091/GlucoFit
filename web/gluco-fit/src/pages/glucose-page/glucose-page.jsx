import { GlucoseList } from "../../components/glucose/index";
import PageLayout from "../../components/layout/page-layout/page-layout";
import jumboGlucemia from "../../assets/jumbotron-glucemia.jpg"

function GlucosePage() {
  return (
    <PageLayout 
      jumbotron={{
          background: jumboGlucemia,
        }}
    >
    <div className="container py-4">
      <h1 
  style={{ 
    color: "#680A0E", 
    fontFamily: "'Outfit', sans-serif", 
    fontWeight: 700 
  }}
>Registros de glucemia</h1>

      {/* Listado de registros existentes */}
      <GlucoseList />
    </div>

    </PageLayout>
    
  );
}

export default GlucosePage;