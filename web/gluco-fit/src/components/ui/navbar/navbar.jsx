import { Link, NavLink } from "react-router-dom";
import glucoFitLogo from "../../../assets/gluco-fit-logo.png";
import { useAuth } from "../../../hooks/use-auth";

function NavBar() {
  const { user, logout } = useAuth();
  return (
    <>
      {/* Barra superior */}
      <nav
        className="navbar navbar-dark"
        style={{ backgroundColor: "#F7F4EF" }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between px-4">
          {/* Izquierda: nombre de la app */}
          <div className="d-flex align-items-center text-white fw-bold fs-5">
            <Link to="/">
              <img
                src={glucoFitLogo}
                alt="glucoFit-logo"
                style={{ height: "60px", width: "auto" }}
              />
            </Link>
          </div>

          {/* Derecha: login / registro */}
          {user ? (
            <div>
              <ul className="navbar-nav flex-row gap-3 d-flex list-unstyled m-0 p-0">
                <li className="nav-item ">
                  <i class="fa-solid fa-id-card-clip fa-float text-secondary m-1"></i>
                  <span className="m-2 fw-bold small text-uppercase text-secondary">
                    {user.username}
                  </span>
                </li>
                <li className="nav-item border-start border-secondary ps-3">
                  <NavLink
                    to="/"
                    className="btn btn-link text-secondary p-0 border-0 text-decoration-none shadow-none"
                    onClick={() => {
                      logout();
                    }}
                    title="Cerrar sesión" // (aparece al pasar el ratón)
                    style={{ transition: "transform 0.2s ease" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.15)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                  >
                    {/* Icono de Font Awesome (Sign-out) */}
                    <i class="fa-solid fa-right-from-bracket fa-wag text-secondary"></i>
                  </NavLink>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3 text-white">
              <NavLink
                className="btn btn-secondary btn-sm fw-semibold"
                to="/login"
              >
                <i className="bi bi-person-circle me-1"></i> Login
              </NavLink>
              <NavLink
                className="btn bg-body-secondary btn-sm fw-semibold"
                to="/register"
              >
                Registro
              </NavLink>
            </div>
          )}
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
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 20,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                to="/glucose"
              >
                Mi Glucosa
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase text-secondary fw-bold small"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 20,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
                to="/recipes"
              >
                Dieta
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                className="nav-link text-uppercase text-secondary fw-bold small"
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: 20,
                  textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                }}
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
