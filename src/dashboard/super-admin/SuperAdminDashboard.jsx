import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { AdminManagement } from './components/AdminManagement';
import { SystemStats } from './components/SystemStats';
import { PaymentSummary } from '../admin/components/PaymentSummary';
import { UserManagement } from '../admin/components/UserManagement';
import { Card } from '@/shared/components/ui/Card';
import { userService } from '@/shared/services/api/userService';
import { transactionService } from '@/shared/services/api/transactionService';

export const SuperAdminDashboard = () => {
     const [admins, setAdmins] = useState([]);
     const [users, setUsers] = useState([]);
     const [transactions, setTransactions] = useState([]);
     const [adminLoading, setAdminLoading] = useState(true);
     const [dashboardLoading, setDashboardLoading] = useState(true);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [usersData, transactionsData, allUsers] = await Promise.all([
                         userService.getAllUsers(),
                         transactionService.getAllTransactions(),
                         userService.getAllUsers()
                    ]);

                    setAdmins(allUsers.filter(u => u.role === 'admin'));
                    setUsers(usersData);
                    setTransactions(transactionsData);
               } finally {
                    setAdminLoading(false);
                    setDashboardLoading(false);
               }
          };

          fetchData();
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

     const handleToggleStatus = async (userId, currentStatus) => {
          try {
               await userService.updateUser(userId, { isActive: !currentStatus });
               setUsers(users.map(user =>
                    user.id === userId ? { ...user, isActive: !currentStatus } : user
               ));
          } catch (error) {
               console.error('Failed to toggle user status:', error);
          }
     };

     return (
          <DashboardLayout title="Super Admin Dashboard">
               <div className="space-y-6">
                    {/* Single header section */}
                    <div className="flex items-center justify-between">
                         <div className="flex items-center space-x-3">
                              <span className="text-2xl">👑</span>
                              <h1 className="text-2xl font-bold text-gray-900">Super Admin Dashboard</h1>
                         </div>
                    </div>

                    <SystemStats />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                         {/* Admin Management Section */}
                         <div className="lg:col-span-1">
                              <AdminManagement
                                   admins={admins}
                                   loading={adminLoading}
                                   onAddAdmin={handleAddAdmin}
                                   onRemoveAdmin={handleRemoveAdmin}
                              />
                         </div>

                         {/* Dashboard Content Section */}
                         <div className="lg:col-span-2 space-y-6">
                              <Card title="Admin Dashboard" className="border border-gray-200">
                                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">User Management</h3>
                                             <UserManagement
                                                  users={users.filter(u => u.role === 'user')}
                                                  loading={dashboardLoading}
                                                  onToggleStatus={handleToggleStatus}
                                             />
                                        </div>

                                        <div>
                                             <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Summary</h3>
                                             <PaymentSummary
                                                  users={users.filter(u => u.role === 'user')}
                                                  transactions={transactions}
                                             />
                                        </div>
                                   </div>
                              </Card>

                              <Card title="Recent Activity" className="border border-gray-200">
                                   <div className="space-y-4">
                                        <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                                             <div className="bg-blue-100 p-2 rounded-full">
                                                  <span className="text-blue-600">👤</span>
                                             </div>
                                             <div>
                                                  <p className="font-medium">New admin added</p>
                                                  <p className="text-sm text-gray-500">Jane Smith was added as admin</p>
                                                  <p className="text-xs text-gray-400">2 hours ago</p>
                                             </div>
                                        </div>

                                        <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                                             <div className="bg-green-100 p-2 rounded-full">
                                                  <span className="text-green-600">🔄</span>
                                             </div>
                                             <div>
                                                  <p className="font-medium">System update</p>
                                                  <p className="text-sm text-gray-500">Version 2.3.1 deployed</p>
                                                  <p className="text-xs text-gray-400">Yesterday</p>
                                             </div>
                                        </div>
                                   </div>
                              </Card>
                         </div>
                    </div>
               </div>
          </DashboardLayout>
     );
};