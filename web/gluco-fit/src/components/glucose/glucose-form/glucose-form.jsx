import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth"
import useGlucose from "../../../hooks/use-glucose"


function GlucoseForm() {
    const navigate = useNavigate(); 
    const { user } = useAuth(); 
    const { create } = useGlucose(); 

    const { 
        register, 
        handleSubmit, 
        reset, 
        formState: { errors, isSubmitting  }} 
        = useForm({ mode: "all" }); 

    const onSubmit = async (formData) => {
        try {
            const payload = {
                ...formData, 
                user: user?.id
            }; 

            await create(payload); 
            reset(); 
            navigate("/glucose")

        } catch (error) {
            console.error("Error creando datos de glucemia", error)
        }
    }
    return (
         <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
      <h3>Registrar glucemia</h3>

      {/* VALUE */}
      <label>
        Valor (mg/dL)
        <input
          type="number"
          {...register("value", {
            required: "El valor es obligatorio",
            min: { value: 20, message: "El mínimo es 20" },
            max: { value: 600, message: "El máximo es 600" }
          })}
          style={styles.input}
          placeholder="Valor"
        />
      </label>
      {errors.value && <p style={styles.error}>{errors.value.message}</p>}

      {/* MOMENT */}
      <label>
        Momento del día
        <select
          {...register("moment", {
            required: "El momento del día es obligatorio"
          })}
          style={styles.input}
        >
          <option value="">Selecciona...</option>
          <option value="desayuno">Desayuno</option>
          <option value="almuerzo">Almuerzo</option>
          <option value="comida">Comida</option>
          <option value="merienda">Merienda</option>
          <option value="cena">Cena</option>
        </select>
      </label>
      {errors.moment && <p style={styles.error}>{errors.moment.message}</p>}

      {/* NOTES */}
      <label>
        Notas (opcional)
        <textarea
          {...register("notes", {
            minLength: {
              value: 10,
              message: "Debe tener al menos 10 caracteres"
            },
            maxLength: {
              value: 200,
              message: "Debe tener como máximo 200 caracteres"
            }
          })}
          style={styles.textarea}
          placeholder="Escriba su nota"
        />
      </label>
      {errors.notes && <p style={styles.error}>{errors.notes.message}</p>}

      <button type="submit" disabled={isSubmitting} style={styles.button}>
        {isSubmitting ? "Guardando..." : "Guardar registro"}
      </button>
    </form>
  );
}

const styles = {
  form: {
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    maxWidth: "400px",
    margin: "20px auto"
  },
  input: {
    display: "block",
    width: "100%",
    marginTop: "8px",
    marginBottom: "16px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  textarea: {
    display: "block",
    width: "100%",
    height: "80px",
    marginTop: "8px",
    marginBottom: "16px",
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "4px",
    cursor: "pointer"
  },
  error: {
    color: "red",
    marginBottom: "10px"
  }
};

export default GlucoseForm; 