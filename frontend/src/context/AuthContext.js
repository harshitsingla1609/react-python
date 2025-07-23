import React, { createContext, useState, useEffect, useContext } from 'react';
import * as api from '../services/services';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [access, setAccess] = useState(localStorage.getItem('access'));
  const [refresh, setRefresh] = useState(localStorage.getItem('refresh'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (access) {
      api.getUser(access).then(data => {
        if (!data.detail) setUser(data);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [access]);

  async function login(email, password) {
    const data = await api.login(email, password);
    console.log(data, 'resres datadata')
    if (data.access && data.refresh) {
      setAccess(data.access);
      setRefresh(data.refresh);
      localStorage.setItem('access', data.access);
      localStorage.setItem('refresh', data.refresh);
      const userData = await api.getUser(data.access);
      setUser(userData);
      return { success: true };
    }
    return { success: false, error: data.detail };
  }

  async function register(email, username, password, password2) {
    const data = await api.register(email, username, password, password2);
    if (data.email && data.username) {
      // Registration successful
      return { success: true };
    }
    return { success: false, error: data };
  }

  async function logout() {
    if (refresh) await api.logout(refresh);
    setAccess(null);
    setRefresh(null);
    setUser(null);
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
  }

  async function refreshAccessToken() {
    if (!refresh) return;
    const data = await api.refreshToken(refresh);
    console.log(data, 'datadatadata')
    if (data.access) {
      setAccess(data.access);
      localStorage.setItem('access', data.access);
    } else {
      logout();
    }
  }

  // Auto-refresh token every 4 minutes
  useEffect(() => {
    if (!refresh) return;
    const interval = setInterval(() => {
      console.log('datadatadata 1111')
      refreshAccessToken();
    }, 4 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, access, refresh, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 