import { GlucoseCard } from "../index";
import useGlucose from "../../../hooks/use-glucose";

function GlucoseList() {
  const { records, loading, error } = useGlucose();

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error al cargar los datos.</p>;

  return (
    <div style={styles.grid}>
      {records.map((record) => (
        <GlucoseCard key={record.id} record={record} />
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "16px",
    padding: "20px",
  },
};

export default GlucoseList;
