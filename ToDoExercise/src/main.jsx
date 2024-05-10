import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import { taskStore } from "./store/taskStore.jsx";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={taskStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
