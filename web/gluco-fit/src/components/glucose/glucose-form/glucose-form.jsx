import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useGlucose from "../../../hooks/use-glucose";

function GlucoseForm() {
  const navigate = useNavigate();
  const { create } = useGlucose();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "all" });

  const unidadesInsulina = watch("insulina.unidades");

  const onSubmit = async (formData) => {
    try {
      const payload = {
        value: Number(formData.value),
        moment: formData.moment,
        date: formData.date,
      };

      const trimmedNotes = formData.notes?.trim();

      if (trimmedNotes) {
        payload.notes = trimmedNotes;
      }
      if (formData.insulina?.unidades) {
        payload.insulina = {
          unidades: Number(formData.insulina.unidades),
          tipo: formData.insulina.tipo,
        };
      }

      await create(payload);
      reset();
      navigate("/glucose");
    } catch (error) {
      console.error("Error creando datos de glucemia", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="card p-4 mx-auto"
      style={{ maxWidth: 420 }}
    >
      <h3 className="mb-3">Registrar glucemia</h3>

      {/* VALUE */}
      <div className="mb-3">
        <label className="form-label">Valor (mg/dL)</label>
        <input
          type="number"
          {...register("value", {
            required: "El valor es obligatorio",
            min: { value: 20, message: "El mínimo es 20" },
            max: { value: 600, message: "El máximo es 600" },
          })}
          className={`form-control ${errors.value ? "is-invalid" : ""}`}
          placeholder="Ej. 110"
        />
        {errors.value && (
          <div className="invalid-feedback">{errors.value.message}</div>
        )}
      </div>
      {/* DATE */}
      <div className="mb-3">
        <label className="form-label">Fecha y hora</label>
        <input
          type="datetime-local"
          {...register("date", {
            required: "La fecha es obligatoria",
            validate: (value) => {
              const selected = new Date(value);
              const now = new Date();
              return selected <= now || "No puedes registrar una fecha futura";
            },
          })}
          className={`form-control ${errors.date ? "is-invalid" : ""}`}
        />
        {errors.date && (
          <div className="invalid-feedback">{errors.date.message}</div>
        )}
      </div>

      {/* MOMENT */}
      <div className="mb-3">
        <label className="form-label">Momento del día</label>
        <select
          {...register("moment", {
            required: "El momento del día es obligatorio",
          })}
          className={`form-select ${errors.moment ? "is-invalid" : ""}`}
        >
          <option value="">Selecciona...</option>
          <option value="desayuno">Desayuno</option>
          <option value="almuerzo">Almuerzo</option>
          <option value="comida">Comida</option>
          <option value="merienda">Merienda</option>
          <option value="cena">Cena</option>
        </select>
        {errors.moment && (
          <div className="invalid-feedback">{errors.moment.message}</div>
        )}
      </div>

      {/* INSULINA (opcional) */}
      <fieldset className="mb-3 border rounded p-3">
        <legend className="fs-6 fw-semibold w-auto px-1">
          Insulina <span className="text-muted fw-normal">(opcional)</span>
        </legend>

        <div className="mb-2">
          <label className="form-label">Unidades</label>
          <input
            type="number"
            step="0.5"
            {...register("insulina.unidades", {
              min: { value: 0, message: "No puede ser negativo" },
              max: { value: 100, message: "Revisa el valor, parece muy alto" },
            })}
            className={`form-control ${errors.insulina?.unidades ? "is-invalid" : ""}`}
            placeholder="Ej. 6"
          />
          {errors.insulina?.unidades && (
            <div className="invalid-feedback">
              {errors.insulina.unidades.message}
            </div>
          )}
        </div>

        <div>
          <label className="form-label">Tipo</label>
          <select
            {...register("insulina.tipo", {
              // Solo obligatorio SI se han metido unidades.
              validate: (value) =>
                !unidadesInsulina || value
                  ? true
                  : "Selecciona el tipo de insulina",
            })}
            className={`form-select ${errors.insulina?.tipo ? "is-invalid" : ""}`}
          >
            <option value="">Selecciona...</option>
            <option value="rapida">Rápida</option>
            <option value="lenta">Lenta</option>
          </select>
          {errors.insulina?.tipo && (
            <div className="invalid-feedback">
              {errors.insulina.tipo.message}
            </div>
          )}
        </div>
      </fieldset>

      {/* NOTES */}
      <div className="mb-3">
        <label className="form-label">Notas (opcional)</label>
        <textarea
          {...register("notes", {
            minLength: {
              value: 10,
              message: "Debe tener al menos 10 caracteres",
            },
            maxLength: {
              value: 200,
              message: "Debe tener como máximo 200 caracteres",
            },
          })}
          className={`form-control ${errors.notes ? "is-invalid" : ""}`}
          rows={3}
          placeholder="Escribe una nota si quieres"
        />
        {errors.notes && (
          <div className="invalid-feedback">{errors.notes.message}</div>
        )}
      </div>

      <button type="submit" disabled={isSubmitting} className="btn btn-secondary">
        {isSubmitting ? "Guardando..." : "Guardar registro"}
      </button>
    </form>
  );
}

export default GlucoseForm;
