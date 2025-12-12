// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PageA from "./pages/about";
import PageB from "./pages/ContactUs";
import Enquiry from "./pages/Enquiry";
import AdminPanel from "./pages/AdminPanel";
import VendorPayment from "./pages/VendorPayment";
import AdminUsers from "./pages/AdminUsers";
import AdminVendors from "./pages/AdminVendors";
import AdminContactUs from "./pages/AdminContactUs";

import ProtectedRoute from "./auth/ProtectedRoute";
import Layout from "./components/Layout"; // renders AppNav + Outlet
import { AdminProvider } from "./contexts/AdminContext";

export default function App() {
  return (
    <Routes>
      {/* Use Layout for everything so navbar is always visible */}
      <Route path="/" element={<Layout />}>
        {/* default landing */}
        <Route index element={<Navigate to="/dashboard" replace />} />

        {/* public */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="vendor-payment" element={<VendorPayment />} />
        
        {/* Admin routes wrapped with AdminProvider */}
        <Route path="admin" element={<AdminProvider><AdminPanel /></AdminProvider>} />
        <Route path="admin/users" element={<AdminProvider><AdminUsers /></AdminProvider>} />
        <Route path="admin/vendors" element={<AdminProvider><AdminVendors /></AdminProvider>} />
        <Route path="admin/contacts" element={<AdminProvider><AdminContactUs /></AdminProvider>} />
        
        <Route path="app/about" element={<PageA />} />
        <Route path="app/contact" element={<PageB />} />

        {/* protected sub-routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="app/1-KVA" element={<Enquiry />} />
        </Route>
        {/* fallback */}
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}
