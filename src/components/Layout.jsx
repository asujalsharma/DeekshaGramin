// src/components/Layout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";

export default function Layout() {
  return (
    <>
      <AppNav />
      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}
