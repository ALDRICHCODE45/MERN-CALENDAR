import { useSelector } from "react-redux";
import { useAuthStore } from "../../hooks/useAuthStore";

export const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { startLogOutUser } = useAuthStore();

  const handleLogOut = () => {
    startLogOutUser();
  };

  return (
    <div className="navbar navbar-dark bg-dark mb-4 px-4">
      <span className="navbar-brand">
        <i className="fas fa-calendar-alt"></i>
        &nbsp; {user.name}
      </span>
      <button onClick={handleLogOut} className="btn btn-outline-danger">
        <i className="fas fa-sign-out-alt"></i>
        <span>Salir</span>
      </button>
    </div>
  );
};
