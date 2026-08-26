import { GlucoseList } from "../../components/glucose/index";
import PageLayout from "../../components/layout/page-layout/page-layout";

function GlucosePage() {
  return (
    <PageLayout>
    <div>
      <h2>Mis registros de glucosa</h2>
      <GlucoseList />
    </div>

    </PageLayout>
    
  );
}

export default GlucosePage;