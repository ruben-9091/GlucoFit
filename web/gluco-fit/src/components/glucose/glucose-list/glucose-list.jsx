import { GlucoseCard, GlucoseCharts } from "../index";
import useGlucose from "../../../hooks/use-glucose";

function GlucoseList() {
  const { records, loading, error } = useGlucose();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <div className="container-fluid mt-3">
      <div className="row g-4">
        {/* Izquierda: listado de registros */}
        <div className="col-12 col-lg-5">
          <h5 className="mb-3">Tus registros</h5>
          <div style={{ maxHeight: "75vh", overflowY: "auto" }}>
            {records.length === 0 ? (
              <p className="text-muted">
                Aún no tienes registros de glucemia.
              </p>
            ) : (
              records.map((record) => (
                <GlucoseCard key={record.id} record={record} />
              ))
            )}
          </div>
        </div>

        {/* Derecha: gráficos */}
        <div className="col-12 col-lg-7">
          <h5 className="mb-3">Evolución</h5>
          <GlucoseCharts records={records} />
        </div>
      </div>
    </div>
  );
}

export default GlucoseList;
