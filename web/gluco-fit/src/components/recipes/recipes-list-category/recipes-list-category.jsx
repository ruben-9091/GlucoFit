import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import * as RecipesService from "../../../services/recipes-service/recipes-service";

// Mover el objeto fuera del componente evita recrearlo en cada render
const TITULOS_CATEGORIA = {
  dessert: "Postres",
  meat: "Carnes",
  salad: "Ensaladas",
  vegan: "Veganas",
};

export function RecipesListCategory() {
  // 1. Obtenemos la categoría directamente desde la URL (/recipes/:categoria)
  const { categoria } = useParams();

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecipesByCategory() {
      try {
        setLoading(true);
        // Traemos todas las recetas de la API
        const allRecipes = await RecipesService.listRecipes();

        // Filtramos para quedarnos solo con las de esta categoría
        const filteredRecipes = allRecipes.filter(
          (recipe) => recipe.categoria?.toLowerCase() === categoria?.toLowerCase()
        );

        setRecipes(filteredRecipes);
      } catch (error) {
        console.error("Error al obtener las recetas de la categoría:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecipesByCategory();
  }, [categoria]); // Se vuelve a ejecutar si cambia el parámetro de la URL

  const tituloMostrar = TITULOS_CATEGORIA[categoria] || categoria;

  if (loading) {
    return <p className="text-center my-5">Cargando recetas de {tituloMostrar}...</p>;
  }

  return (
    <div className="container my-5">
      {/* Botón para volver al listado general de categorías */}
      <div className="mb-4">
        <NavLink to="/recipes" className="btn btn-outline-secondary btn-sm">
        Volver a Categorías
        </NavLink>
      </div>

      <h1 className="mb-4 fw-bold text-capitalize">
        Recetas: {tituloMostrar}
      </h1>

      {recipes.length === 0 ? (
        <div className="alert alert-info text-center" role="alert">
          No hay recetas registradas para la categoría <strong>{tituloMostrar}</strong>.
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
          {recipes.map((recipe) => (
            <div key={recipe.id} className="col">
              <div className="card h-100 shadow-sm border-0 rounded-3 overflow-hidden">
                <img
                  src={recipe.imagenUrl}
                  className="card-img-top"
                  alt={recipe.nombre}
                  style={{ height: "180px", objectFit: "cover" }}
                />
                
                {/* Contenedor principal del cuerpo de la card */}
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-bold">
                    {recipe.nombre}
                  </h5>

                  {/* Badges para Tiempo, Dificultad y Calorías */}
                  <div className="d-flex flex-wrap gap-2 my-2">
                    {recipe.tiempoPreparacion && (
                      <span className="badge bg-light text-dark border">
                        ⏱️ {recipe.tiempoPreparacion}
                      </span>
                    )}
                    {recipe.dificultad && (
                      <span className="badge bg-warning text-dark">
                        ⚡ {recipe.dificultad}
                      </span>
                    )}
                    {recipe.informacionNutricional?.calorias && (
                      <span className="badge bg-danger">
                        🔥 {recipe.informacionNutricional.calorias} kcal
                      </span>
                    )}
                  </div>

                  <div className="mt-auto pt-3">
                    <NavLink
                      to={`/recipes/${categoria}/${recipe.id}`}
                      className="btn btn-primary w-100 rounded-3"
                    >
                      Ver Receta
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

export default RecipesListCategory;