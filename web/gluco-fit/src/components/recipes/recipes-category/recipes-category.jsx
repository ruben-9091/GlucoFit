import { Link } from "react-router-dom";

// Recibe la categoría (ej: "dessert") y la imagenUrl como props
export function RecipesCategory({ categoria, imagenUrl }) {
  // Nombres descriptivos para mostrar en el título de la tarjeta
  const titulos = {
    dessert: "Postres",
    meat: "Carnes",
    salad: "Ensaladas",
    vegan: "Veganas",
  };

  return (
    <div className="col">
      {/* Al hacer clic, navega dinámicamente a /recipes/dessert, /recipes/meat, etc. */}
      <Link to={`/recipes/${categoria}`} className="text-decoration-none">
        <div className="card text-white overflow-hidden shadow h-100 border-0 rounded-4">
          <img
            src={imagenUrl}
            className="card-img"
            alt={categoria}
            style={{ height: "220px", objectFit: "cover" }}
          />
          <div className="card-img-overlay d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
            <h2 className="card-title text-uppercase fw-bold m-0 text-light fs-3">
              {titulos[categoria] || categoria}
            </h2>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default RecipesCategory;