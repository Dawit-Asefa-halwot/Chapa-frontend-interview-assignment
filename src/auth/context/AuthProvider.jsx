import React, { useState } from 'react';
import { AuthContext } from './AuthContext';
import { authService } from '../services/authService';

export const AuthProvider = ({ children }) => {
     const [user, setUser] = useState(null);
     const [isLoading, setIsLoading] = useState(false);

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