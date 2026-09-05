// glucose-stats.js
// Funciones puras para agrupar registros de glucosa por semana o
// mes, y calcular la media de un valor concreto (glucosa o insulina)
// en cada periodo.

function getWeekKey(dateStr) {
  const d = new Date(dateStr);
  const year = d.getFullYear();
  const firstJan = new Date(year, 0, 1);
  const days = Math.floor((d - firstJan) / 86400000);
  const week = Math.ceil((days + firstJan.getDay() + 1) / 7);
  return `${year}-S${String(week).padStart(2, "0")}`;
}

function getMonthKey(dateStr) {
  const d = new Date(dateStr);
  const meses = [
    "Ene", "Feb", "Mar", "Abr", "May", "Jun",
    "Jul", "Ago", "Sep", "Oct", "Nov", "Dic",
  ];
  return `${meses[d.getMonth()]} ${d.getFullYear()}`;
}

/**
 * Agrupa records por periodo (semana o mes) y calcula la media
 * del valor que devuelva valueFn para cada grupo.
 *
 * valueFn puede devolver null/undefined si ese registro no tiene
 * el dato (p. ej. un registro sin insulina) -> se ignora, no cuenta
 * como 0.
 */
function aggregate(records, keyFn, valueFn) {
  const buckets = {};

  records.forEach((record) => {
    const value = valueFn(record);
    if (value === null || value === undefined || Number.isNaN(value)) {
      return;
    }
    const key = keyFn(record.date);
    if (!buckets[key]) {
      buckets[key] = { sum: 0, count: 0 };
    }
    buckets[key].sum += value;
    buckets[key].count += 1;
  });

  return Object.entries(buckets)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([label, { sum, count }]) => ({
      label,
      media: Number((sum / count).toFixed(1)),
    }));
}

export function weeklyAverage(records, valueFn) {
  return aggregate(records, getWeekKey, valueFn);
}

export function monthlyAverage(records, valueFn) {
  return aggregate(records, getMonthKey, valueFn);
}

// Accesores para los dos valores que nos interesan.
export const getGlucoseValue = (record) => record.value;
export const getInsulinaValue = (record) => record.insulina?.unidades;
