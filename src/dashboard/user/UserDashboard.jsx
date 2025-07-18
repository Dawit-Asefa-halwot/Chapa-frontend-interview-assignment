import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/shared/components/layout/DashboardLayout';
import { useAuth } from '@/auth/hooks/useAuth';
import { WalletBalance } from './components/WalletBalance';
import { TransactionList } from './components/TransactionList';
import { TransactionForm } from './components/TransactionForm';
import { transactionService } from '@/shared/services/api/transactionService';

export const UserDashboard = () => {
     const { user } = useAuth();
     const [transactions, setTransactions] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
          const loadTransactions = async () => {
               if (user?.id) {
                    try {
                         const data = await transactionService.getUserTransactions(user.id);
                         setTransactions(data);
                    } finally {
                         setLoading(false);
                    }
               }
          };

          loadTransactions();
     }, [user?.id]);

     const handleTransactionSubmit = async (transactionData) => {
          const newTransaction = {
               ...transactionData,
               userId: user.id,
               status: 'pending',
          };

          await transactionService.createTransaction(newTransaction);
          setTransactions([newTransaction, ...transactions]);
     };

     return (
          <DashboardLayout title="User Dashboard">
               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                         <WalletBalance balance={user?.walletBalance || 0} />
                    </div>
                    <div className="lg:col-span-2 space-y-6">
                         <TransactionList transactions={transactions} loading={loading} />
                         <TransactionForm onSubmit={handleTransactionSubmit} />
                    </div>
               </div>
          </DashboardLayout>
     );
};