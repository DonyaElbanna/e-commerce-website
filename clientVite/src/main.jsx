import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./rtk/store";
import axios from "axios";
// axios.defaults.baseURL = "http://localhost:9999/"
axios.defaults.withCredentials = true;
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App className="bg-white" />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
