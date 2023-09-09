import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./router/AppRouter";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import { store } from "./store/store";

export const CalendarApp = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
        <Toaster richColors />
      </BrowserRouter>
    </Provider>
  );
};
