import React, { createContext, useContext, useState, useEffect } from 'react';
import { adminAPI } from '../services/api.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check if admin is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyAdmin();
    } else {
      setLoading(false);
    }
  }, []);

  const verifyAdmin = async () => {
    try {
      setLoading(true);
      const result = await adminAPI.getCurrentAdmin();
      setAdmin(result.admin);
    } catch (err) {
      localStorage.removeItem('adminToken');
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const result = await adminAPI.login({ email, password });
      localStorage.setItem('adminToken', result.token);
      setAdmin(result.admin);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, passwordConfirm) => {
    try {
      setLoading(true);
      setError(null);
      const result = await adminAPI.register({ name, email, password, passwordConfirm });
      localStorage.setItem('adminToken', result.token);
      setAdmin(result.admin);
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        admin,
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated: !!admin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
