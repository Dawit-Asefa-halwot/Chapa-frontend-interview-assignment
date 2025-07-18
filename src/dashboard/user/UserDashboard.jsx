import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { useAuth } from '@/auth/hooks/useAuth';
import { WalletBalance } from './components/WalletBalance';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { transactionService } from '@/shared/services/api/transactionService';
import { userService } from '@/shared/services/api/userService';

export const UserDashboard = () => {
     const { user, setUser } = useAuth();
     const [transactions, setTransactions] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const loadData = async () => {
               if (user?.id) {
                    try {
                         const transactionsData = await transactionService.getUserTransactions(user.id);
                         setTransactions(transactionsData);
                    } finally {
                         setLoading(false);
                    }
               }
          };

          loadData();
     }, [user?.id]);

     const handleTransactionSubmit = async (transactionData) => {
          try {
               const newTransaction = await transactionService.createTransaction(
                    {
                         ...transactionData,
                         userId: user.id,
                         status: 'pending',
                    },
                    userService // Pass userService for balance update
               );

               // Update local transactions list
               setTransactions([newTransaction, ...transactions]);

               // Update auth context with new balance
               const updatedUser = await userService.getUserById(user.id);
               setUser(updatedUser);

               return true;
          } catch (error) {
               console.error('Transaction failed:', error.message);
               return false;
          }
     };

     return (
          <DashboardLayout title="User Dashboard">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                         <WalletBalance balance={user?.walletBalance || 0} />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                         <TransactionList transactions={transactions} loading={loading} />
                         <TransactionForm
                              onSubmit={handleTransactionSubmit}
                              balance={user?.walletBalance || 0}
                         />
                    </div>
               </div>
          </DashboardLayout>
     );
};