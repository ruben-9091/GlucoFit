import ExerciseCategory from "../exercises-category/exercise-category";
import { useState, useEffect } from "react";

import * as ExerciseService from "../../../services/exercise-service/exercise-service";
import { NavLink } from "react-router-dom";

//implementar loader si da tiempo

export function AllExercisesController() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Pedimos todas las recetas a la base de datos
        const exercise = await ExerciseService.listExercises();

        // Extraemos solo una muestra de cada categoría (dessert, meat, salad, vegan)
        const categoryMap = {};
        exercise.forEach((exercise) => {
          if (!categoryMap[exercise.categoria]) {
            categoryMap[exercise.categoria] = exercise.imagenUrl;
          }
        });

        // Convertimos el objeto en un array de objetos { categoria, imagenUrl }
        const categoriesData = Object.keys(categoryMap).map((catKey) => ({
          categoria: catKey,
          imagenUrl: categoryMap[catKey],
        }));

        setCategories(categoriesData);
      } catch (error) {
        console.error("Error al cargar las categorías", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center my-5">Cargando categorías...</p>;
  } else {
    return (
      <div className="container my-5">
      <div className="mb-4">
          <NavLink
            to="/"
            className="btn btn-sm text-white"
            style={{ backgroundColor: "#762024", borderColor: "#0a0505" }}
          >
            <strong>Volver a pantalla principal</strong>
          </NavLink>
        </div>
        <h1 className="mb-4 text-center fw-bold">Entrenamientos</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {categories.map((item) => (
            <ExerciseCategory
              key={item.categoria}
              categoria={item.categoria}
              imagenUrl={item.imagenUrl}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default AllExercisesController;
