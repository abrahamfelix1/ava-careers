import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact"; // if you created it
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  </BrowserRouter>
);
