import { NavLink } from "react-router-dom"; 
//import { useAuth } from "directorio de auth que cree"

function NavBar() {
  return (
    <>
      {/* Barra superior */}
      <nav className="navbar navbar-dark" style={{ backgroundColor: "#0d6efd" }}>
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">

          {/* Izquierda: nombre de la app */}
          <div className="d-flex align-items-center text-white fw-bold fs-5">
            GlucoFit
          </div>

          {/* Derecha: login / registro */}
          <div className="d-flex align-items-center gap-3 text-white">
            <NavLink className="text-white text-decoration-none fw-semibold" to="/login">
              <i className="bi bi-person-circle me-1"></i> Login
            </NavLink>
            <NavLink className="btn btn-light btn-sm fw-semibold" to="/register">
              Registro
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Barra inferior */}
      <nav
        className="navbar navbar-expand navbar-dark"
        style={{ backgroundColor: "#0b5ed7", borderTop: "1px solid #084298" }}
      >
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav gap-4">

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase fw-bold small"
                to="/glucose"
              >
                Mi Glucosa
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase fw-bold small"
                to="/diet"
              >
                Dieta
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase fw-bold small"
                to="/exercise"
              >
                Ejercicio
              </NavLink>
            </li>

          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;