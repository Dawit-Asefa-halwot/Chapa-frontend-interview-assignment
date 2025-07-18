import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { AdminDashboard } from '../admin/AdminDashboard';
import { AdminManagement } from './components/AdminManagement';
import { SystemStats } from './components/SystemStats';
import { userService } from '@/shared/services/api/userService';

export const SuperAdminDashboard = () => {
     const [admins, setAdmins] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchAdmins = async () => {
               try {
                    const users = await userService.getAllUsers();
                    setAdmins(users.filter(u => u.role === 'admin'));
               } finally {
                    setLoading(false);
               }
          };

          fetchAdmins();
     }, []);

     const handleAddAdmin = async (name, email) => {
          try {
               const newAdmin = await userService.createUser({
                    name,
                    email,
                    role: 'admin',
                    isActive: true,
               });
               setAdmins([...admins, newAdmin]);
          } catch (error) {
               console.error('Failed to add admin:', error);
          }
     };

     const handleRemoveAdmin = async (adminId) => {
          try {
               await userService.deleteUser(adminId);
               setAdmins(admins.filter(admin => admin.id !== adminId));
          } catch (error) {
               console.error('Failed to remove admin:', error);
          }
     };

     return (
          <DashboardLayout title="Super Admin Dashboard">
               <div className="space-y-6">
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                              <span className="text-2xl">👑</span>
                              <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
                         </div>
                    </div>

                    <SystemStats />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <AdminManagement
                              admins={admins}
                              loading={loading}
                              onAddAdmin={handleAddAdmin}
                              onRemoveAdmin={handleRemoveAdmin}
                         />
                         <AdminDashboard />
                    </div>
               </div>
          </DashboardLayout>
     );
};