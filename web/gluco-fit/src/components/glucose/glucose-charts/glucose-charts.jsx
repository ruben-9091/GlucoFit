import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import {
  weeklyAverage,
  monthlyAverage,
  getGlucoseValue,
  getInsulinaValue,
} from "../../../data/glucose-data";

function MiniChart({ title, data, color, unit, emptyMessage }) {
  if (data.length === 0) {
    return (
      <div className="card p-3 h-100">
        <h6 className="mb-2">{title}</h6>
        <p className="text-muted small mb-0">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="card p-3 h-100">
      <h6 className="mb-2">{title}</h6>
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="label" tick={{ fontSize: 11 }} />
          <YAxis tick={{ fontSize: 11 }} />
          <Tooltip formatter={(value) => [`${value} ${unit}`, "Media"]} />
          <Line
            type="monotone"
            dataKey="media"
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function GlucoseCharts({ records }) {
  const glucosaSemanal = weeklyAverage(records, getGlucoseValue);
  const glucosaMensual = monthlyAverage(records, getGlucoseValue);
  const insulinaSemanal = weeklyAverage(records, getInsulinaValue);
  const insulinaMensual = monthlyAverage(records, getInsulinaValue);

  return (
    <div className="row g-3">
      <div className="col-12 col-xl-6">
        <MiniChart
          title="Glucosa · media semanal"
          data={glucosaSemanal}
          color="#c23b4b"
          unit="mg/dL"
          emptyMessage="Aún no hay suficientes registros."
        />
      </div>
      <div className="col-12 col-xl-6">
        <MiniChart
          title="Glucosa · media mensual"
          data={glucosaMensual}
          color="#c23b4b"
          unit="mg/dL"
          emptyMessage="Aún no hay suficientes registros."
        />
      </div>
      <div className="col-12 col-xl-6">
        <MiniChart
          title="Insulina · media semanal"
          data={insulinaSemanal}
          color="#2b6f5e"
          unit="unidades"
          emptyMessage="Sin registros de insulina todavía."
        />
      </div>
      <div className="col-12 col-xl-6">
        <MiniChart
          title="Insulina · media mensual"
          data={insulinaMensual}
          color="#2b6f5e"
          unit="unidades"
          emptyMessage="Sin registros de insulina todavía."
        />
      </div>
    </div>
  );
}

export default GlucoseCharts;
