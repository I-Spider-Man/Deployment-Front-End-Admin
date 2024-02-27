import React from "react";
import { createRoot } from "react-dom/client"; // Update import statement
import { Provider } from "react-redux";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";
import { store } from "./redux/store";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DarkModeContextProvider>
        <App />
      </DarkModeContextProvider>
    </Provider>
  </React.StrictMode>
);
