import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as ExerciseService from "../../../services/exercise-service/exercise-service";

export function ExerciseDetail() {
  const { id } = useParams(); // Captura el ID del entrenamiento desde la URL
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchExercise() {
      try {
        setLoading(true);
        const data = await ExerciseService.getExerciseDetail(id);
        setExercise(data);
      } catch (err) {
        console.error("Error al cargar el detalle del entrenamiento:", err);
        setError("No se pudo encontrar el entrenamiento solicitado.");
      } finally {
        setLoading(false);
      }
    }

    fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center my-5 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando entrenamiento...</p>
      </div>
    );
  }

  if (error || !exercise) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error || "El entrenamiento no existe."}
        </div>
        <NavLink to="/exercises" className="btn btn-primary mt-3">
          Volver a Categorías
        </NavLink>
      </div>
    );
  }

  return (
    <div className="container my-5">
      {/* Botón para regresar a la categoría anterior */}
      <div className="mb-4">
        <NavLink
          to={`/exercises/${exercise.categoria?.toLowerCase()}`}
          className="btn btn-sm text-white"
            style={{ backgroundColor: "#762024", borderColor: "#0a0505" }}
        >
          <strong>Volver a página de entrenamientos</strong> 
        </NavLink>
      </div>

      {/* Cabecera Principal del Entrenamiento */}
      <div className="row g-4 align-items-center mb-5">
        <div className="col-md-6">
          <img
            src={exercise.imagenUrl}
            alt={exercise.nombre}
            className="img-fluid rounded-4 shadow object-fit-cover w-100"
            style={{ maxHeight: "400px" }}
          />
        </div>

        <div className="col-md-6">
          <span className="badge bg-danger text-uppercase mb-2 fs-6 px-3 py-2 rounded-pill">
            {exercise.categoria}
          </span>
          <h1 className="fw-bold display-5 text-dark mb-3">{exercise.nombre}</h1>

          {/* Badges de Información rápida */}
          <div className="d-flex flex-wrap gap-3 mb-4">
            {exercise.duracion && (
              <div className="bg-light p-2 px-3 rounded-3 border">
                <small className="text-muted d-block">Duración</small>
                <strong>⏱️ {exercise.duracion}</strong>
              </div>
            )}
            {exercise.dificultad && (
              <div className="bg-light p-2 px-3 rounded-3 border">
                <small className="text-muted d-block">Dificultad</small>
                <strong>⚡ {exercise.dificultad}</strong>
              </div>
            )}
            {exercise.informacionCalorica?.caloriasQuemadasAprox && (
              <div className="bg-light p-2 px-3 rounded-3 border">
                <small className="text-muted d-block">Gasto Calórico</small>
                <strong>🔥 ~{exercise.informacionCalorica.caloriasQuemadasAprox} kcal</strong>
              </div>
            )}
            {exercise.tipo && (
              <div className="bg-light p-2 px-3 rounded-3 border">
                <small className="text-muted d-block">Tipo</small>
                <strong>💪 {exercise.tipo}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* Columna Izquierda: Equipamiento + Métricas/Detalles del Entrenamiento */}
        <div className="col-lg-5">
          {/* Tarjeta de Material / Equipamiento necesario */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-light">
            <h3 className="fw-bold mb-3 text-dark">🏋️‍♂️ Equipamiento Necesario</h3>
            {exercise.equipamiento && exercise.equipamiento !== "Sin equipamiento" ? (
              <p className="text-secondary m-0">🔧 {exercise.equipamiento}</p>
            ) : (
              <p className="text-muted m-0">No se requiere equipamiento especial (Peso corporal).</p>
            )}
          </div>

          {/* Tabla de Estructura / Parámetros del Ejercicio */}
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h4 className="fw-bold mb-3 text-dark">📊 Estructura de la Sesión</h4>
            <table className="table table-borderless m-0">
              <tbody>
                {exercise.duracion && (
                  <tr className="border-bottom">
                    <td className="text-muted ps-0">Duración</td>
                    <td className="fw-bold text-end pe-0">{exercise.duracion}</td>
                  </tr>
                )}
                {exercise.informacionCalorica?.frecuenciaCardiacaMedia && (
                  <tr className="border-bottom">
                    <td className="text-muted ps-0">Frecuencia Cardíaca Media</td>
                    <td className="fw-bold text-end pe-0">
                      {exercise.informacionCalorica.frecuenciaCardiacaMedia} ppm
                    </td>
                  </tr>
                )}
                {exercise.grupoMuscularPrincipal && exercise.grupoMuscularPrincipal.length > 0 && (
                  <tr>
                    <td className="text-muted ps-0">Grupo Muscular</td>
                    <td className="fw-bold text-end pe-0">
                      {exercise.grupoMuscularPrincipal.join(", ")}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Columna Derecha: Instrucciones / Pasos de Ejecución */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h3 className="fw-bold mb-4 text-dark">📋 Instrucciones de Ejecución</h3>
            {exercise.pasos && exercise.pasos.length > 0 ? (
              <ol className="list-unstyled mb-0">
                {exercise.pasos.map((paso, index) => (
                  <li key={index} className="d-flex gap-3 mb-4 align-items-start">
                    <span
                      className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center flex-shrink-0 fw-bold"
                      style={{ width: "36px", height: "36px" }}
                    >
                      {index + 1}
                    </span>
                    <div className="pt-1">
                      <p className="m-0 text-secondary lh-lg">{paso}</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-muted">No se han detallado las instrucciones para este ejercicio.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExerciseDetail;
