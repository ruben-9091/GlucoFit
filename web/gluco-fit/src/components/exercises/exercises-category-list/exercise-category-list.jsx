import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as ExerciseService from "../../../services/exercise-service/exercise-service";

// Mover el objeto fuera del componente evita recrearlo en cada render
const TITULOS_CATEGORIA = {
  running: "Entrenamientos Cardiovasculares",
  gym: "Entrenamientos de fuerza",
  flex: "Ejercicios de flexibilidad",
 
};

export function ExerciseCategoryList() {
  // 1. Obtenemos la categoría directamente desde la URL (/exercise/:categoria)
  const { categoria } = useParams();

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchExerciseByCategory() {
      try {
        setLoading(true);
        // Traemos todas las recetas de la API
        const allExercises = await ExerciseService.listExercises();

        // Filtramos para quedarnos solo con las de esta categoría
        const filteredExercises = allExercises.filter(
          (exercise) =>
            exercise.categoria?.toLowerCase() === categoria?.toLowerCase(),
        );

        setExercises(filteredExercises);
      } catch (error) {
        console.error("Error al obtener los entrenamientos de la categoría:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchExerciseByCategory();
  }, [categoria]); // Se vuelve a ejecutar si cambia el parámetro de la URL

  const tituloMostrar = TITULOS_CATEGORIA[categoria] || categoria;

  if (loading) {
    return (
      <p className="text-center my-5">Cargando entrenamientos de {tituloMostrar}...</p>
    );
  }

  return (
    <div className="container my-5">
      {/* Botón para volver al listado general de categorías */}
      <div className="mb-4">
        <NavLink
          to="/exercises"
          className="btn btn-sm text-white"
          style={{ backgroundColor: "#762024", borderColor: "#0a0505" }}
        >
          <strong>Volver a Categorías</strong>
        </NavLink>
      </div>

      <h1 className="mb-4 fw-bold text-capitalize">Entrenamientos: {tituloMostrar}</h1>

      {exercises.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay ejercicios registrados para la categoría{" "}
          <strong>{tituloMostrar}</strong>.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                <img
                  src={exercise.imagenUrl}
                  className="card-img-top"
                  alt={exercise.nombre}
                  style={{ height: "180px", objectFit: "cover" }}
                />

                {/* Contenedor principal del cuerpo de la card */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">{exercise.nombre}</h5>

                  {/* Badges ajustados al JSON de Ejercicios */}
                  <div className="d-flex flex-wrap gap-2 my-2">
                    {exercise.duracion && (
                      <span className="badge bg-light text-dark border">
                        ⏱️ {exercise.duracion}
                      </span>
                    )}
                    {exercise.dificultad && (
                      <span className="badge bg-warning text-dark">
                        ⚡ {exercise.dificultad}
                      </span>
                    )}
                    {exercise.informacionCalorica?.caloriasQuemadasAprox && (
                      <span className="badge bg-danger">
                        🔥 {exercise.informacionCalorica.caloriasQuemadasAprox} kcal
                      </span>
                    )}
                    {exercise.tipo && (
                      <span className="badge bg-secondary">
                        💪 {exercise.tipo}
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-3">
                    <NavLink
                      to={`/exercises/${categoria}/${exercise.id}`}
                      className="btn btn-secondary w-100 rounded-3"
                    >
                      <strong>Ver detalles del entrenamiento</strong>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ExerciseCategoryList;
