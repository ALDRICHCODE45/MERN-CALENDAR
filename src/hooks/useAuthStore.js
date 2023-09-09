import { useDispatch } from "react-redux";
import calendarApi from "../api/calendarApi";
import {
  onLogin,
  onChecking,
  onLogout,
  onClearErrorMessage,
} from "../store/auth/authSlice";
import { toast } from "sonner";
import { onLogOutCalendar } from "../store/calendar/calendarSlice";

export const useAuthStore = () => {
  const dispatch = useDispatch();

  const startLoginUser = async ({ email, password }) => {
    dispatch(onChecking());
    console.log({ email, password });
    try {
      const { data } = await calendarApi.post("/auth", { email, password });
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      localStorage.setItem("token", data.token);
    } catch (error) {
      dispatch(onLogout("credenciales incorrectas"));
      toast.error("ha ocurrido un error");
      setTimeout(() => {
        dispatch(onClearErrorMessage());
      }, 2000);
    }
  };

  const startCreateUser = async ({ name, email, password }) => {
    dispatch(onChecking());
    try {
      const { data } = await calendarApi.post("/auth/newUser", {
        name,
        email,
        password,
      });
      dispatch(onLogin({ name: data.name, uid: data.uid }));
      localStorage.setItem("token", data.token);
    } catch ({ response }) {
      const { data } = response;
      toast.error(data.msg);
      //   console.log(response);
    }
  };

  const checkAuthToken = async () => {
    const token = localStorage.getItem("token");
    if (!token) return dispatch(onLogout());

    try {
      const { data } = await calendarApi.get("/auth/renew");
      localStorage.setItem("token", data.token);
      dispatch(onLogin({ name: data.name, uid: data.uid }));
    } catch (error) {
      localStorage.clear();
      dispatch(onLogout());
    }
  };

  const startLogOutUser = () => {
    localStorage.clear();
    dispatch(onLogout());
    dispatch(onLogOutCalendar());
  };

  return {
    startLoginUser,
    startCreateUser,
    checkAuthToken,
    startLogOutUser,
  };
};
