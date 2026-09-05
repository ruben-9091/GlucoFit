function GlucoseCard({ record }) {
  const momentLabels = {
    desayuno: "Desayuno",
    almuerzo: "Almuerzo",
    comida: "Comida",
    merienda: "Merienda",
    cena: "Cena",
  };

  const insulinaLabels = {
    rapida: "Rápida",
    lenta: "Lenta",
    mixta: "Mixta",
  };

    function getGlucoseColorClass(value) {
    if (value < 80) return "text-danger";
    if (value <= 150) return "text-success";
    if (value <= 250) return "text-warning";
    return "text-danger";
  }

  return (
    <div className="card mb-2">
      <div className="card-body py-2 px-3">
        <div className="d-flex justify-content-between align-items-start">
          <h5 className={`mb-1 ${getGlucoseColorClass(record.value)}`}>
            {record.value} <small className="fs-6">mg/dL</small>
          </h5>
          <span className="badge bg-light text-dark border">
            {momentLabels[record.moment] || record.moment}
          </span>
        </div>

        <p className="text-muted small mb-1">
          {new Date(record.date).toLocaleString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>

        {record.insulina?.unidades && (
          <p className="mb-1 small">
            <i className="fa fa-heartbeat fa-fw text-success"></i>{" "}
            {record.insulina.unidades} u.{" "}
            {record.insulina.tipo && `(${insulinaLabels[record.insulina.tipo]})`}
          </p>
        )}

        {record.notes && (
          <p className="mb-0 small">
            <strong>Notas:</strong> {record.notes}
          </p>
        )}
      </div>
    </div>
  );
}

export default GlucoseCard;