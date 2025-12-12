const API_BASE_URL = "http://localhost:3000/api/userAuth";

/**
 * Auth Service
 * Handles all authentication-related API calls
 */

export const authService = {
  /**
   * User Signup
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Response with user data and token
   */
  signup: async (userData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      // Store token if provided
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },

  /**
   * User Login
   * @param {Object} credentials - Login credentials (email/mobile and password)
   * @returns {Promise<Object>} Response with user data and token
   */
  login: async (credentials) => {
    console.log(credentials);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Store token if provided
      if (data.token) {
        localStorage.setItem("authToken", data.token);
      }

      // Store user data
      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      return data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  /**
   * User Logout
   * @returns {Promise<Object>} Response confirmation
   */
  logout: async () => {
    try {
      const token = localStorage.getItem("authToken");

      const response = await fetch(`${API_BASE_URL}/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      // Clear local storage regardless of API response
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      if (!response.ok) {
        console.warn("Logout API warning:", data.message);
      }

      return data;
    } catch (error) {
      console.error("Logout error:", error);
      // Clear local storage even if API fails
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      throw error;
    }
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} User object or null
   */
  getCurrentUser: () => {
    try {
      const userStr = localStorage.getItem("user");
      return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  /**
   * Get auth token from localStorage
   * @returns {string|null} Token or null
   */
  getToken: () => {
    return localStorage.getItem("authToken");
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated: () => {
    const token = localStorage.getItem("authToken");
    return !!token;
  },

  /**
   * Verify token validity (optional - depends on backend support)
   * @returns {Promise<boolean>} Token validity
   */
  verifyToken: async () => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        return false;
      }

      // This endpoint might need to be implemented on backend
      const response = await fetch(`${API_BASE_URL}/verify`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.ok;
    } catch (error) {
      console.error("Token verification error:", error);
      return false;
    }
  },
};

export default authService;
