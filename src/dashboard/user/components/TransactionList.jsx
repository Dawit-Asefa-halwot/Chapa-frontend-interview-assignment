import React from 'react';

export const TransactionList = ({ transactions, loading }) => {
     const formatAmount = (amount) => {
          return new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: 'USD',
          }).format(amount);
     };

     const formatDate = (dateString) => {
          return new Date(dateString).toLocaleDateString('en-US', {
               month: 'short',
               day: 'numeric',
               year: 'numeric',
          });
     };

     const getStatusColor = (status) => {
          switch (status) {
               case 'completed':
                    return 'bg-green-100 text-green-800';
               case 'pending':
                    return 'bg-yellow-100 text-yellow-800';
               case 'failed':
                    return 'bg-red-100 text-red-800';
               default:
                    return 'bg-gray-100 text-gray-800';
          }
     };

     if (loading) {
          return (
               <div className="text-center py-8">
                    <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 h-12 w-12 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading transactions...</p>
               </div>
          );
     }

     return (
          <div className="space-y-3">
               <h3 className="text-lg font-semibold text-gray-900">Recent Transactions</h3>
               {transactions.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                         <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                              <span className="text-2xl">⏱️</span>
                         </div>
                         <p className="text-lg font-medium">No transactions yet</p>
                         <p className="text-sm text-gray-400">Your transaction history will appear here</p>
                    </div>
               ) : (
                    transactions.map((transaction) => (
                         <div
                              key={transaction.id}
                              className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-green-50/30 rounded-xl hover:from-green-50 hover:to-emerald-50 transition-all duration-200 transform hover:scale-102 border border-gray-100/50"
                         >
                              <div className="flex items-center space-x-3">
                                   <div className={`p-3 rounded-full ${transaction.type === 'credit' ? 'bg-green-100 border-2 border-green-200' : 'bg-red-100 border-2 border-red-200'
                                        }`}>
                                        {transaction.type === 'credit' ? (
                                             <span className="text-green-600">⬇️</span>
                                        ) : (
                                             <span className="text-red-600">⬆️</span>
                                        )}
                                   </div>
                                   <div>
                                        <p className="font-semibold text-gray-900">{transaction.description}</p>
                                        <p className="text-sm text-gray-600">{formatDate(transaction.date)}</p>
                                   </div>
                              </div>
                              <div className="text-right">
                                   <p className={`font-bold text-lg ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
                                   </p>
                                   <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(transaction.status)}`}>
                                        {transaction.status}
                                   </span>
                              </div>
                         </div>
                    ))
               )}
          </div>
     );
};