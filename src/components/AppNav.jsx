// src/components/AppNav.jsx
import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
// import logo from "../../public/logo.jpeg";

export default function AppNav() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-4">
          {/* LOGO SECTION */}
          <div className="flex items-center gap-2">
            <img
              src="public/logo.jpeg" // <-- your logo file here
              alt="Deeksha Gramin Solar Logo"
              className="w-10 h-10 object-contain rounded"
            />
            <span className="font-bold text-green-600 text-lg">
              Deeksha Gramin Solar
            </span>
          </div>

          {/* NAV LINKS */}
          <div className="flex gap-4 ml-8">
            <NavLink
              to="/app"
              end
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-700"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/app/about"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-700"
              }
            >
              About
            </NavLink>
            <NavLink
              to="/app/contact"
              className={({ isActive }) =>
                isActive ? "text-blue-600 font-medium" : "text-gray-700"
              }
            >
              Contact
            </NavLink>
          </div>

          {/* USER + LOGOUT */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm">Hi, {user?.name}</span>
            <button
              onClick={handleLogout}
              className="text-sm text-red-500 hover:text-red-700"
            >
              Log out
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-6">
        <Outlet />
      </main>
    </>
  );
}
