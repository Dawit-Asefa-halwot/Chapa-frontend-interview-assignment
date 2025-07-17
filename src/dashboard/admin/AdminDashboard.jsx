import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '../../../shared/components/layout/DashboardLayout';
import { UserManagement } from './components/UserManagement';
import { PaymentSummary } from './components/PaymentSummary';
import { userService } from '../../../shared/services/api/userService';
import { transactionService } from '../../../shared/services/api/transactionService';

export const AdminDashboard = () => {
     const [users, setUsers] = useState([]);
     const [transactions, setTransactions] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const fetchData = async () => {
               try {
                    const [usersData, transactionsData] = await Promise.all([
                         userService.getAllUsers(),
                         transactionService.getAllTransactions(),
                    ]);
                    setUsers(usersData);
                    setTransactions(transactionsData);
               } finally {
                    setLoading(false);
               }
          };

          fetchData();
     }, []);

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
          <DashboardLayout title="Admin Dashboard">
               <div className="space-y-6">
                    <div className="flex items-center justify-between">
                         <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                         {/* Stats cards would go here */}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         <UserManagement
                              users={users.filter(u => u.role === 'user')}
                              loading={loading}
                              onToggleStatus={handleToggleStatus}
                         />
                         <PaymentSummary
                              users={users.filter(u => u.role === 'user')}
                              transactions={transactions}
                         />
                    </div>
               </div>
          </DashboardLayout>
     );
};