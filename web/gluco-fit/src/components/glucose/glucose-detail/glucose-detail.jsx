

function GlucoseCard({ record }) {
  return (
    <div style={styles.card}>
      <h3>{record.value} mg/dL</h3>
      <p>
        <strong>Fecha:</strong> {new Date(record.date).toLocaleDateString()}
      </p>
      {record.notes && (
        <p>
          <strong>Notas:</strong> {record.notes}
        </p>
      )}
    </div>
  );
}

const styles = {
  card: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "16px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
};

export default GlucoseCard;
