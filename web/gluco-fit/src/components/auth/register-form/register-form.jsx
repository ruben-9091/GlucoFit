//name, username, email, password, diabetes type

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as AuthService from "../../../services/auth-service/auth-service";
import homePageIcon from "../../../assets/homepage-icon2.png";

function RegisterForm() {
  const [serverError, setServerError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const navigate = useNavigate();

  const handleUserRegister = async (user) => {
    try {
      setServerError(null);
      await AuthService.register(user);
      navigate("/login");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "No se pudo completar el registro.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUserRegister)}>
      {/* NAME */}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-user fa-fw"></i>
        </span>
        <input
          type="text"
          {...register("name", { required: "User name is required" })}
          className={`form-control ${errors.name ? "is-invalid" : ""}`}
          placeholder="Name"
        />
        {errors.name && (
          <div className="invalid-feedback">{errors.name.message}</div>
        )}
      </div>

      {/* USERNAME */}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-tag fa-fw"></i>
        </span>
        <input
          type="text"
          {...register("username", { required: "User username is required" })}
          className={`form-control ${errors.username ? "is-invalid" : ""}`}
          placeholder="username"
        />
        {errors.username && (
          <div className="invalid-feedback">{errors.username.message}</div>
        )}
      </div>

      {/* EMAIL */}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-envelope-o fa-fw"></i>
        </span>
        <input
          type="email"
          {...register("email", { required: "User email is required" })}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="user@example.org"
        />
        {errors.email && (
          <div className="invalid-feedback">{errors.email.message}</div>
        )}
      </div>

      {/* PASSWORD */}
      <div className="input-group mb-2">
        <span className="input-group-text">
          <i className="fa fa-lock fa-fw"></i>
        </span>
        <input
          type="password"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: { value: 8, message: "Mínimo 8 caracteres" },
          })}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="***********"
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      {/* DIABETES TYPE */}
      <div className="input-group mb-2">
        <span className="input-group-text">
          <i className="fa fa-heartbeat fa-fw"></i>
        </span>
        <select
          {...register("diabetesType", {
            required: "Debes escoger el tipo de diabetes",
          })}
          className={`form-select ${errors.diabetesType ? "is-invalid" : ""}`}
        >
          <option value="">Selecciona...</option>
          <option value="type1">Tipo 1</option>
          <option value="type2">Tipo 2</option>
          <option value="gestacional">Gestacional</option>
        </select>
        {errors.diabetesType && (
          <div className="invalid-feedback">{errors.diabetesType.message}</div>
        )}
      </div>

      {serverError && <div className="alert alert-danger">{serverError}</div>}

      <div className="d-grid gap-2">
        <button
          className="btn bg-warning-subtle text-dark border-warning"
          type="submit"
          disabled={!isValid}
        >
          Register
        </button>
        <hr className="m-0" />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <hr className="m-0" />
        <Link to="/" className="d-block mx-auto text-center">
          <img
            src={homePageIcon}
            alt="homepage-icon"
            style={{
              maxWidth: "135px",
              height: "auto",
            }}
          />
        </Link>
      </div>
    </form>
  );
}

export default RegisterForm;
