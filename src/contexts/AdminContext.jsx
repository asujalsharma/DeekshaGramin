import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  fetchUsers,
  fetchVendors,
  fetchContacts,
  fetchAdminStats
} from '../services/adminApi';

// Create the context
const AdminContext = createContext();

// Custom hook to use the admin context
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

// Admin Provider Component
export const AdminProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [vendors, setVendors] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    users: 0,
    vendors: 0,
    contacts: 0,
    revenue: 0,
    activeVendors: 0,
    pendingVendors: 0,
    completedPayments: 0,
    newMessages: 0,
    inProgressMessages: 0,
    repliedMessages: 0,
    usersWithAadhar: 0,
    usersWithPan: 0,
    completeUserProfiles: 0
  });
  const [loading, setLoading] = useState({
    users: false,
    vendors: false,
    contacts: false,
    stats: false
  });
  const [error, setError] = useState({
    users: null,
    vendors: null,
    contacts: null,
    stats: null
  });

  // Load all users
  const loadUsers = async () => {
    setLoading(prev => ({ ...prev, users: true }));
    setError(prev => ({ ...prev, users: null }));
    
    const result = await fetchUsers();
    
    if (result.success) {
      setUsers(result.data);
    } else {
      setError(prev => ({ ...prev, users: result.error }));
    }
    
    setLoading(prev => ({ ...prev, users: false }));
  };

  // Load all vendors
  const loadVendors = async () => {
    setLoading(prev => ({ ...prev, vendors: true }));
    setError(prev => ({ ...prev, vendors: null }));
    
    const result = await fetchVendors();
    
    if (result.success) {
      setVendors(result.data);
    } else {
      setError(prev => ({ ...prev, vendors: result.error }));
    }
    
    setLoading(prev => ({ ...prev, vendors: false }));
  };

  // Load all contacts
  const loadContacts = async () => {
    setLoading(prev => ({ ...prev, contacts: true }));
    setError(prev => ({ ...prev, contacts: null }));
    
    const result = await fetchContacts();
    
    if (result.success) {
      setContacts(result.data);
    } else {
      setError(prev => ({ ...prev, contacts: result.error }));
    }
    
    setLoading(prev => ({ ...prev, contacts: false }));
  };

  // Load admin stats
  const loadStats = async () => {
    setLoading(prev => ({ ...prev, stats: true }));
    setError(prev => ({ ...prev, stats: null }));
    
    const result = await fetchAdminStats();
    
    if (result.success) {
      setStats(result.data);
    } else {
      setError(prev => ({ ...prev, stats: result.error }));
    }
    
    setLoading(prev => ({ ...prev, stats: false }));
  };

  // Refresh all data
  const refreshAllData = async () => {
    await Promise.all([
      loadUsers(),
      loadVendors(),
      loadContacts(),
      loadStats()
    ]);
  };

  // Load initial data on mount
  useEffect(() => {
    refreshAllData();
  }, []);

  const value = {
    // Data
    users,
    vendors,
    contacts,
    stats,
    
    // Loading states
    loading,
    
    // Error states
    error,
    
    // Methods
    loadUsers,
    loadVendors,
    loadContacts,
    loadStats,
    refreshAllData,
    
    // Setters (for optimistic updates if needed)
    setUsers,
    setVendors,
    setContacts,
    setStats
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};
