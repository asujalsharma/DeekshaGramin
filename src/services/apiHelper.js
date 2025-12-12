import { authService } from './authService';

/**
 * API Helper Utilities
 * Provides helper functions for making authenticated API calls
 */

const API_BASE_URL = 'https://gramin-solar-backend-dr7q.vercel.app/api';

/**
 * Make an authenticated API request
 * Automatically includes auth token in headers
 * 
 * @param {string} endpoint - API endpoint (e.g., '/users/profile')
 * @param {Object} options - Fetch options
 * @returns {Promise<Object>} Response data
 */
export const authenticatedFetch = async (endpoint, options = {}) => {
  const token = authService.getToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add Authorization header if token exists
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Handle 401 Unauthorized - token expired or invalid
      if (response.status === 401) {
        // Clear auth data and redirect to login
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(data.message || `API Error: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

/**
 * GET request helper
 */
export const apiGet = (endpoint) => {
  return authenticatedFetch(endpoint, {
    method: 'GET',
  });
};

/**
 * POST request helper
 */
export const apiPost = (endpoint, data) => {
  return authenticatedFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

/**
 * PUT request helper
 */
export const apiPut = (endpoint, data) => {
  return authenticatedFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
};

/**
 * DELETE request helper
 */
export const apiDelete = (endpoint) => {
  return authenticatedFetch(endpoint, {
    method: 'DELETE',
  });
};

/**
 * Upload file with authentication
 */
export const apiUpload = async (endpoint, formData) => {
  const token = authService.getToken();
  
  const config = {
    method: 'POST',
    headers: {},
    body: formData,
  };

  // Add Authorization header if token exists
  // Note: Don't set Content-Type for FormData, browser will set it automatically with boundary
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
        throw new Error('Session expired. Please login again.');
      }

      throw new Error(data.message || `Upload failed: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
};

/**
 * Example usage in components:
 * 
 * import { apiGet, apiPost } from '../services/apiHelper';
 * 
 * // Fetch user profile
 * const profile = await apiGet('/users/profile');
 * 
 * // Update user profile
 * const updated = await apiPost('/users/profile', { name: 'New Name' });
 * 
 * // Get all enquiries
 * const enquiries = await apiGet('/enquiries');
 * 
 * // Create new enquiry
 * const newEnquiry = await apiPost('/enquiries', { 
 *   type: 'solar',
 *   message: 'Interested in solar panels'
 * });
 */

export default {
  authenticatedFetch,
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  apiUpload,
};
