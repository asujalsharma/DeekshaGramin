import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import logo from "../../public/logo.jpeg";

export default function AppNav() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/dashboard");
  };

  const NavItem = ({ to, children }) => (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          isActive ? "text-blue-600" : "text-gray-700 hover:text-blue-600"
        }`
      }
      onClick={() => setOpen(false)}
    >
      {children}
    </NavLink>
  );

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo + title */}
        <div className="flex items-center gap-3">
          <img src={logo} alt="logo" className="w-10 h-10 object-contain" />
          <span className="font-bold text-green-600 text-lg">
            Deeksha Gramin Solar
          </span>
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-4 ml-8">
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/app/about">About</NavItem>
          <NavItem to="/app/contact">Contact</NavItem>
        </div>

        {/* Right controls */}
        <div className="ml-auto hidden md:flex items-center gap-3">
          {user ? (
            <>
              <span className="text-sm">Hi, {user?.name}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-500 hover:text-red-700"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
              >
                Sign Up
              </button>
            </>
          )}
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setOpen((s) => !s)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            <svg
              className={`w-6 h-6 ${open ? "hidden" : "block"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <svg
              className={`w-6 h-6 ${open ? "block" : "hidden"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden ${open ? "block" : "hidden"} border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/app/about">About</NavItem>
          <NavItem to="/app/contact">Contact</NavItem>
        </div>
        <div className="px-4 pb-4 border-t">
          {user ? (
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-medium">{user?.name}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
              <button
                onClick={() => {
                  handleLogout();
                  setOpen(false);
                }}
                className="px-3 py-2 rounded-md bg-red-50 text-red-600 text-sm hover:bg-red-100"
              >
                Log out
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigate("/login");
                  setOpen(false);
                }}
                className="flex-1 px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700"
              >
                Login
              </button>
              <button
                onClick={() => {
                  navigate("/signup");
                  setOpen(false);
                }}
                className="flex-1 px-3 py-2 rounded-md bg-green-600 text-white text-sm hover:bg-green-700"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
