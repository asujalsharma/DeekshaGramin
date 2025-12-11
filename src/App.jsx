// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PageA from "./pages/about"; // <- ensure this file exists
import PageB from "./pages/PageB";
import ProtectedRoute from "./auth/ProtectedRoute";
import AppNav from "./components/AppNav";

export default function App() {
  return (
    <div className="app-root">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/app" element={<ProtectedRoute />}>
          <Route element={<AppNav />}>
            <Route index element={<Dashboard />} />
            <Route path="about" element={<PageA />} />
            <Route path="contact" element={<PageB />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </div>
  );
}
