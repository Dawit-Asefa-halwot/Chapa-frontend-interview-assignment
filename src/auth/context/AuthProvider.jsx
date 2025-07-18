import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(() => {
          // Check localStorage for existing session
          const savedUser = localStorage.getItem('user');
          return savedUser ? JSON.parse(savedUser) : null;
     });

     const [isLoading, setIsLoading] = useState(false);

     useEffect(() => {
          // Save user to localStorage whenever it changes
          if (user) {
               localStorage.setItem('user', JSON.stringify(user));
          } else {
               localStorage.removeItem('user');
          }
     }, [user]);

     const login = async (email, password) => {
          setIsLoading(true);
          try {
               const userData = await authService.login(email, password);
               setUser(userData);
               return true;
          } catch (error) {
               console.error('Login failed:', error);
               return false;
          } finally {
               setIsLoading(false);
          }
     };

     const logout = () => {
          setUser(null);
     };

     return (
          <AuthContext.Provider value={{ user, login, logout, isLoading }}>
               {children}
          </AuthContext.Provider>
     );
};