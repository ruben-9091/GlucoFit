import { useState, useEffect } from "react";
import * as RecipesService from "../../../services/recipes-service/recipes-service";
import { RecipesCategory } from "../../../components/recipes/index"

import PageLayout from "../../../components/layout/page-layout/page-layout";

export function RecipesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        // Pedimos todas las recetas a la base de datos
        const recipes = await RecipesService.listRecipes();

        // Extraemos solo una muestra de cada categoría (dessert, meat, salad, vegan)
        const categoryMap = {};
        recipes.forEach((recipe) => {
          if (!categoryMap[recipe.categoria]) {
            categoryMap[recipe.categoria] = recipe.imagenUrl;
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

  if (loading) return <p className="text-center my-5">Cargando categorías...</p>;

  return (
    <PageLayout>
    <div className="container my-5">
      <h1 className="mb-4 text-center fw-bold">Categorías de Recetas</h1>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {categories.map((item) => (
          <RecipesCategory
            key={item.categoria}
            categoria={item.categoria}
            imagenUrl={item.imagenUrl}
          />
        ))}
      </div>
    </div>
    </PageLayout>
  );
}

export default RecipesPage;