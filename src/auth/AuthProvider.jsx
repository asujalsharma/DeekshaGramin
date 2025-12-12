import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function useAuth() { 
  return useContext(AuthContext);
}

// Auth provider with real API integration
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const storedUser = authService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  /**
   * Signup new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} User data
   */
  const signup = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.signup(userData);
      
      if (response.user) {
        setUser(response.user);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'Signup failed');
      setLoading(false);
      throw err;
    }
  };

  /**
   * Login user
   * @param {Object} credentials - Login credentials
   * @returns {Promise<Object>} User data
   */
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await authService.login(credentials);
      
      if (response.user) {
        setUser(response.user);
      }
      
      setLoading(false);
      return response;
    } catch (err) {
      setError(err.message || 'Login failed');
      setLoading(false);
      throw err;
    }
  };

  /**
   * Logout user
   */
  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      
      await authService.logout();
      
      setUser(null);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Logout failed');
      setUser(null); // Clear user even if API fails
      setLoading(false);
      console.error('Logout error:', err);
    }
  };

  /**
   * Update user data
   * @param {Object} userData - Updated user data
   */
  const updateUser = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  /**
   * Clear error
   */
  const clearError = () => {
    setError(null);
  };

  const value = { 
    user, 
    signup, 
    login, 
    logout, 
    loading,
    error,
    updateUser,
    clearError,
    isAuthenticated: !!user,
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
