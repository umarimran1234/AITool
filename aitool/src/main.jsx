import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App.jsx";

import Signin from "./components/signin/page.jsx";
import BeautifulForm from "./components/home/Form.jsx";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/Signup" element={<BeautifulForm />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
