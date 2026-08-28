import { GlucoseList } from "../../components/glucose/index";
import PageLayout from "../../components/layout/page-layout/page-layout";

function GlucosePage() {
  return (
    <PageLayout>
    <div className="container py-4">
      <h1 className="fw-bold mb-4">Registros de glucemia</h1>

      {/* Listado de registros existentes */}
      <GlucoseList />
    </div>

    </PageLayout>
    
  );
}

export default GlucosePage;