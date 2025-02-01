// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
// import { Routes, Route } from "react-router-dom";
import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// import Signin from "./components/signin/page.jsx";
createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
