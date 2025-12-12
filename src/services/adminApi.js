// Admin API service layer
// This file contains all API calls for the admin panel
// Currently using dummy data, but can be easily replaced with real API calls

import { dummyUsers, dummyVendors, dummyContacts } from '../data/dummyData';

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// ==================== USER API CALLS ====================

/**
 * Fetch all users
 * Replace with: axios.get('/api/admin/users')
 */
export const fetchUsers = async () => {
  try {
    await delay(300); // Simulate network delay
    return {
      success: true,
      data: dummyUsers
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Fetch single user by ID
 * Replace with: axios.get(`/api/admin/users/${userId}`)
 */
export const fetchUserById = async (userId) => {
  try {
    await delay(300);
    const user = dummyUsers.find(u => u.id === userId);
    if (!user) {
      throw new Error('User not found');
    }
    return {
      success: true,
      data: user
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update user
 * Replace with: axios.put(`/api/admin/users/${userId}`, userData)
 */
export const updateUser = async (userId, userData) => {
  try {
    await delay(500);
    // Simulate update
    return {
      success: true,
      data: { ...userData, id: userId }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete user
 * Replace with: axios.delete(`/api/admin/users/${userId}`)
 */
export const deleteUser = async (userId) => {
  try {
    await delay(500);
    return {
      success: true,
      message: 'User deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== VENDOR API CALLS ====================

/**
 * Fetch all vendors
 * Replace with: axios.get('/api/admin/vendors')
 */
export const fetchVendors = async () => {
  try {
    await delay(300);
    return {
      success: true,
      data: dummyVendors
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Fetch single vendor by ID
 * Replace with: axios.get(`/api/admin/vendors/${vendorId}`)
 */
export const fetchVendorById = async (vendorId) => {
  try {
    await delay(300);
    const vendor = dummyVendors.find(v => v.id === vendorId);
    if (!vendor) {
      throw new Error('Vendor not found');
    }
    return {
      success: true,
      data: vendor
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update vendor
 * Replace with: axios.put(`/api/admin/vendors/${vendorId}`, vendorData)
 */
export const updateVendor = async (vendorId, vendorData) => {
  try {
    await delay(500);
    return {
      success: true,
      data: { ...vendorData, id: vendorId }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete vendor
 * Replace with: axios.delete(`/api/admin/vendors/${vendorId}`)
 */
export const deleteVendor = async (vendorId) => {
  try {
    await delay(500);
    return {
      success: true,
      message: 'Vendor deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== CONTACT API CALLS ====================

/**
 * Fetch all contact messages
 * Replace with: axios.get('/api/admin/contacts')
 */
export const fetchContacts = async () => {
  try {
    await delay(300);
    return {
      success: true,
      data: dummyContacts
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Fetch single contact by ID
 * Replace with: axios.get(`/api/admin/contacts/${contactId}`)
 */
export const fetchContactById = async (contactId) => {
  try {
    await delay(300);
    const contact = dummyContacts.find(c => c.id === contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return {
      success: true,
      data: contact
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Update contact status
 * Replace with: axios.patch(`/api/admin/contacts/${contactId}`, { status })
 */
export const updateContactStatus = async (contactId, status) => {
  try {
    await delay(500);
    return {
      success: true,
      data: { id: contactId, status }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * Delete contact
 * Replace with: axios.delete(`/api/admin/contacts/${contactId}`)
 */
export const deleteContact = async (contactId) => {
  try {
    await delay(500);
    return {
      success: true,
      message: 'Contact deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};

// ==================== STATS API CALLS ====================

/**
 * Fetch admin dashboard stats
 * Replace with: axios.get('/api/admin/stats')
 */
export const fetchAdminStats = async () => {
  try {
    await delay(300);
    return {
      success: true,
      data: {
        users: dummyUsers.length,
        vendors: dummyVendors.length,
        contacts: dummyContacts.length,
        revenue: dummyVendors.filter(v => v.paymentStatus === 'Completed').length * 2376,
        activeVendors: dummyVendors.filter(v => v.status === 'Active').length,
        pendingVendors: dummyVendors.filter(v => v.status === 'Pending').length,
        completedPayments: dummyVendors.filter(v => v.paymentStatus === 'Completed').length,
        newMessages: dummyContacts.filter(c => c.status === 'New').length,
        inProgressMessages: dummyContacts.filter(c => c.status === 'In Progress').length,
        repliedMessages: dummyContacts.filter(c => c.status === 'Replied').length,
        usersWithAadhar: dummyUsers.filter(u => u.aadhar).length,
        usersWithPan: dummyUsers.filter(u => u.pan).length,
        completeUserProfiles: dummyUsers.filter(u => u.aadhar && u.pan).length
      }
    };
  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
};
