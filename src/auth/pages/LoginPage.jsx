import "./LoginPage.css";
import { useForm } from "react-hook-form";
import { RegisterPage } from "./RegisterPage";
import { useAuthStore } from "../../hooks/useAuthStore";

export const LoginPage = () => {
  const { startLoginUser } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    startLoginUser(data);
    reset();
  });

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                {...register("email", {
                  required: {
                    value: true,
                    message: "el email es requerido",
                  },
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "correo no valido",
                  },
                })}
              />
              {errors.email && <span>{errors.email.message}</span>}
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                {...register("password", {
                  required: {
                    value: true,
                    message: "el password es requerido",
                  },
                  minLength: {
                    value: 6,
                    message: "el password debe conterner minimo 6 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "el password no puede ser mayor a 20 caracteres",
                  },
                })}
              />
              {errors.password && <span>{errors.password.message}</span>}
            </div>
            <div className="form-group mb-2">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>
        <RegisterPage />
      </div>
    </div>
  );
};
