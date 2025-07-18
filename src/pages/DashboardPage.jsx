import React from 'react';
import { useAuth } from '../auth/hooks/useAuth';
import { UserDashboard } from '../dashboard/user/UserDashboard';
import { AdminDashboard } from '../dashboard/admin/AdminDashboard';
import { SuperAdminDashboard } from '../dashboard/super-admin/SuperAdminDashboard';
import { LoadingSpinner } from '../shared/components/ui/LoadingSpinner';

export const DashboardPage = () => {
     const { user } = useAuth();

     if (!user) return <LoadingSpinner />;

     switch (user.role) {
          case 'user':
               return <UserDashboard />;
          case 'admin':
               return <AdminDashboard />;
          case 'super-admin': // Make sure this matches your data
               return <SuperAdminDashboard />;
          default:
               return <div>Unknown role</div>;
     }
};