import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { store } from "./app/store";
import AuthLoader from "./features/auth/AuthLoader";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <div className="h-full">
          <AuthLoader>
            <App />
          </AuthLoader>

          <ToastContainer position="top-center" autoClose={2500} rtl />
        </div>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);