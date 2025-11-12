import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./store.jsx";
import App from "./App.jsx";
import { LocalizationProvider } from "./context/LocalizationContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </Provider>
  </StrictMode>
);
