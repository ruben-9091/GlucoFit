import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import * as AuthService from "../../../services/auth-service/auth-service";
import { useState } from "react";

function LoginForm() {
  const [serverError, setServerError] = useState(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({ mode: "all" });
  const { login } = useAuth();

  const handleUserLogin = async (user) => {
    try {
      user = await AuthService.login(user);
      login(user);
      navigate("/");
    } catch (error) {
      setServerError(
        error.response?.data?.message || "Email o contraseña incorrectos.",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(handleUserLogin)}>
      {/*EMAIL*/}
      <div className="input-group mb-1">
        <span className="input-group-text">
          <i className="fa fa-envelope-o fa-fw"></i>
        </span>
        <input
          type="email"
          {...register("email", { required: "User email is required" })}
          className={`form-control ${errors.email ? "is-invalid" : ""}`}
          placeholder="Example: user@example.com"
          autoComplete="email"
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
          {...register("password", { required: "User password is required" })}
          className={`form-control ${errors.password ? "is-invalid" : ""}`}
          placeholder="***********" autoComplete="current-password"
        />
        {errors.password && (
          <div className="invalid-feedback">{errors.password.message}</div>
        )}
      </div>

      {serverError && <div className="alert alert-danger">{serverError}</div>}

      <div className="d-grid gap-2">
        <button
          className="btn bg-warning-subtle text-dark border-warning"
          type="submit"
          disabled={!isValid}
        >
          Login
        </button>
        <hr className="m-0 border-secondary-subtle" />
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => navigate("/register")}
        >
          Register
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
