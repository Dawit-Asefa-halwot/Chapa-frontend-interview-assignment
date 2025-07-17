import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../auth/hooks/useAuth';
import { LoadingSpinner } from '../ui/LoadingSpinner';

export const ProtectedRoute = ({ children, allowedRoles }) => {
     const { user, isLoading } = useAuth();

     if (isLoading) {
          return <LoadingSpinner />;
     }

     if (!user) {
          return <Navigate to="/login" replace />;
     }

     if (!allowedRoles.includes(user.role)) {
          return <Navigate to="/" replace />;
     }

     return children;
};