import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function useAuth() { 
  return useContext(AuthContext);
}

// Simple mock auth: store user in localStorage
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  const signup = ({ name, email, password }) => {
    // In a real app call backend. Here we just save locally.
    const newUser = { name, email };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    return Promise.resolve(newUser);
  };

  const login = ({ email, password }) => {
    // Mock: accept any credentials and return a user based on email
    const existing = { name: email.split("@")[0], email };
    localStorage.setItem("user", JSON.stringify(existing));
    setUser(existing);
    return Promise.resolve(existing);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const value = { user, signup, login, logout, loading };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
