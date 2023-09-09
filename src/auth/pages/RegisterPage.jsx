import { useForm } from "react-hook-form";
import { useAuthStore } from "../../hooks/useAuthStore";

export const RegisterPage = () => {
  const { startCreateUser } = useAuthStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const onSubmit = handleSubmit(({ name, email, password }) => {
    startCreateUser({ name, email, password });
    reset();
  });

  return (
    <>
      <div className="col-md-6 login-form-2">
        <h3>Registro</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Nombre"
              {...register("name", {
                required: {
                  value: true,
                  message: "el nombre es requerido",
                },
                minLength: {
                  value: 3,
                  message: "el nombre debe tener minimo 3 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "el nombre debe tener maximo 20 caracteres",
                },
              })}
            />
            {errors.name && (
              <span className="error">{errors.name.message}</span>
            )}
          </div>
          <div className="form-group mb-2">
            <input
              type="email"
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

            {errors.email && (
              <span className="error">{errors.email.message}</span>
            )}
          </div>
          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Contraseña"
              {...register("password", {
                required: {
                  value: true,
                  message: "la password es requerido",
                },
                minLength: {
                  value: 6,
                  message: "la password debe tener minimo 6 caracteres",
                },
                maxLength: {
                  value: 20,
                  message: "el nombre debe tener maximo 20 caracteres",
                },
              })}
            />

            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <div className="form-group mb-2">
            <input
              type="password"
              className="form-control"
              placeholder="Repita la contraseña"
              {...register("confirmpassword", {
                required: {
                  value: true,
                  message: "debes confirmar password",
                },
                validate: (value) =>
                  value === watch("password") || "las passwords no coinciden",
              })}
            />
            {errors.confirmpassword && (
              <span className="error">{errors.confirmpassword.message}</span>
            )}
          </div>

          <div className="form-group mb-2">
            <input type="submit" className="btnSubmit" value="Crear cuenta" />
          </div>
        </form>
      </div>
    </>
  );
};
