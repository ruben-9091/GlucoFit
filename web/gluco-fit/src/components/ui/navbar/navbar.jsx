import { NavLink } from "react-router-dom"; 
import glucoFitLogo from "../../../assets/gluco-fit-logo.png"
//import { useAuth } from "directorio de auth que cree"

function NavBar() {
  return (
    <>
      {/* Barra superior */}
      <nav className="navbar navbar-dark" style={{ backgroundColor: "#F7F4EF" }}>
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">

          {/* Izquierda: nombre de la app */}
          <div className="d-flex align-items-center text-white fw-bold fs-5">
            <img
              src={glucoFitLogo}
              alt="glucoFit-logo"
              style={{ height: "60px", width: "auto" }}
            />
          </div>

          {/* Derecha: login / registro */}
          <div className="d-flex align-items-center gap-3 text-white">
            <NavLink className="btn btn-secondary btn-sm fw-semibold" to="/login">
              <i className="bi bi-person-circle me-1"></i> Login
            </NavLink>
            <NavLink className="btn bg-body-secondary btn-sm fw-semibold" to="/register">
              Registro
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Barra inferior */}
      <nav
        className="navbar navbar-expand navbar-dark"
        style={{ backgroundColor: "#ECE7E1", border: "1px solid #cfcbc5" }}
      >
        <div className="container-fluid justify-content-center">
          <ul className="navbar-nav gap-4">

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase text-secondary fw-bold small"
                style={{ fontFamily: "'Fraunces', serif", fontSize: '1.15rem' }}
                to="/glucose"
              >
                Mi Glucosa
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase text-secondary fw-bold small"
                style={{ fontFamily: "'Fraunces', serif", fontSize: '1.15rem' }}
                to="/diet"
              >
                Dieta
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase text-secondary fw-bold small"
                style={{ fontFamily: "'Fraunces', serif", fontSize: '1.15rem' }}
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