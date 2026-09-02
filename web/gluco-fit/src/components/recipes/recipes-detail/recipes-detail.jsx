import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as RecipesService from "../../../services/recipes-service/recipes-service";

export function RecipeDetail() {
  const { id } = useParams(); // Captura el ID de la receta desde la URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        setLoading(true);
        const data = await RecipesService.getRecipeDetail(id);
        setRecipe(data);
      } catch (err) {
        console.error("Error al cargar el detalle de la receta:", err);
        setError("No se pudo encontrar la receta solicitada.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center my-5 py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Cargando...</span>
        </div>
        <p className="mt-3 text-muted">Cargando receta...</p>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="container my-5 text-center">
        <div className="alert alert-danger" role="alert">
          {error || "La receta no existe."}
        </div>
        <NavLink to="/recipes" className="btn btn-primary mt-3">
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
          to={`/recipes/${recipe.categoria}`} 
          className="btn btn-outline-secondary btn-sm rounded-pill"
        >
         Volver a {recipe.categoria}
        </NavLink>
      </div>

      {/* Cabecera Principal de la Receta */}
      <div className="row g-4 align-items-center mb-5">
        <div className="col-md-6">
          <img
            src={recipe.imagenUrl}
            alt={recipe.nombre}
            className="img-fluid rounded-4 shadow object-fit-cover w-100"
            style={{ maxHeight: "400px" }}
          />
        </div>

        <div className="col-md-6">
          <span className="badge bg-danger text-uppercase mb-2 fs-6 px-3 py-2 rounded-pill">
            {recipe.categoria}
          </span>
          <h1 className="fw-bold display-5 text-dark mb-3">{recipe.nombre}</h1>

          {/* Badges de Información rápida */}
          <div className="d-flex flex-wrap gap-3 mb-4">
            {recipe.tiempoPreparacion && (
              <div className="bg-light p-2 px-3 rounded-3 border">
                <small className="text-muted d-block">Tiempo</small>
                <strong>⏱️ {recipe.tiempoPreparacion}</strong>
              </div>
            )}
            {recipe.dificultad && (
              <div className="bg-light p-2 px-3 rounded-3 border">
                <small className="text-muted d-block">Dificultad</small>
                <strong>⚡ {recipe.dificultad}</strong>
              </div>
            )}
            {recipe.informacionNutricional?.calorias && (
              <div className="bg-light p-2 px-3 rounded-3 border">
                <small className="text-muted d-block">Calorías</small>
                <strong>🔥 {recipe.informacionNutricional.calorias} kcal</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="row g-5">
        {/* Columna Izquierda: Ingredientes + Información Nutricional */}
        <div className="col-lg-5">
          {/* Tarjeta de Ingredientes */}
          <div className="card border-0 shadow-sm rounded-4 p-4 mb-4 bg-light">
            <h3 className="fw-bold mb-3 text-dark">🥗 Ingredientes</h3>
            {recipe.ingredientes && recipe.ingredientes.length > 0 ? (
              <ul className="list-group list-group-flush bg-transparent">
                {recipe.ingredientes.map((ingrediente, index) => (
                  <li 
                    key={index} 
                    className="list-group-item bg-transparent border-0 px-0 d-flex align-items-center gap-2"
                  >
                    <input 
                      type="checkbox" 
                      className="form-check-input mt-0" 
                      id={`ingrediente-${index}`} 
                    />
                    <label 
                      htmlFor={`ingrediente-${index}`} 
                      className="form-check-label text-secondary"
                    >
                      {ingrediente}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">No hay ingredientes especificados.</p>
            )}
          </div>

          {/* Tabla de Información Nutricional */}
          {recipe.informacionNutricional && (
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h4 className="fw-bold mb-3 text-dark">📊 Información Nutricional</h4>
              <table className="table table-borderless m-0">
                <tbody>
                  {recipe.informacionNutricional.calorias !== undefined && (
                    <tr className="border-bottom">
                      <td className="text-muted ps-0">Calorías</td>
                      <td className="fw-bold text-end pe-0">
                        {recipe.informacionNutricional.calorias} kcal
                      </td>
                    </tr>
                  )}
                  {recipe.informacionNutricional.proteinasG !== undefined && (
                    <tr className="border-bottom">
                      <td className="text-muted ps-0">Proteínas</td>
                      <td className="fw-bold text-end pe-0">
                        {recipe.informacionNutricional.proteinasG} g
                      </td>
                    </tr>
                  )}
                  {recipe.informacionNutricional.carbohidratosG !== undefined && (
                    <tr className="border-bottom">
                      <td className="text-muted ps-0">Carbohidratos</td>
                      <td className="fw-bold text-end pe-0">
                        {recipe.informacionNutricional.carbohidratosG} g
                      </td>
                    </tr>
                  )}
                  {recipe.informacionNutricional.grasasG !== undefined && (
                    <tr>
                      <td className="text-muted ps-0">Grasas</td>
                      <td className="fw-bold text-end pe-0">
                        {recipe.informacionNutricional.grasasG} g
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Columna Derecha: Pasos de Preparación */}
        <div className="col-lg-7">
          <div className="card border-0 shadow-sm rounded-4 p-4">
            <h3 className="fw-bold mb-4 text-dark">👩‍🍳 Pasos de Preparación</h3>
            {recipe.pasos && recipe.pasos.length > 0 ? (
              <ol className="list-unstyled mb-0">
                {recipe.pasos.map((paso, index) => (
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
              <p className="text-muted">No se han detallado los pasos de esta receta.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;