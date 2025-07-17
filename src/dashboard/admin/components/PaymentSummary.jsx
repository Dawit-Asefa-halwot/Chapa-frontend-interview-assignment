import React from 'react';
import { Card } from '../../../../shared/components/ui/Card';
import { Button } from '../../../../shared/components/ui/Button';

export const PaymentSummary = ({ users, transactions }) => {
     // Helper function to format currency
     const formatAmount = (amount) => {
          return new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: 'USD',
          }).format(amount);
     };

     // Calculate payment summaries
     const calculatePaymentSummaries = () => {
          const summaries = {};

          // Initialize summaries for each user
          users.forEach(user => {
               if (user.role === 'user') {
                    summaries[user.id] = {
                         userName: user.name,
                         totalPayments: 0,
                         totalAmount: 0,
                    };
               }
          });

          // Process transactions
          transactions.forEach(transaction => {
               if (transaction.status === 'completed' && summaries[transaction.userId]) {
                    summaries[transaction.userId].totalPayments += 1;
                    summaries[transaction.userId].totalAmount += transaction.amount;
               }
          });

          // Convert to array and sort by total amount
          return Object.values(summaries).sort((a, b) => b.totalAmount - a.totalAmount);
     };

     const paymentSummaries = calculatePaymentSummaries();
     const [showChart, setShowChart] = React.useState(false);

     return (
          <Card
               title="Payment Summary"
               subtitle="Financial overview by user"
               className="h-full"
          >
               <div className="flex justify-end mb-4">
                    <Button
                         onClick={() => setShowChart(!showChart)}
                         size="sm"
                         variant="secondary"
                    >
                         {showChart ? 'Show List' : 'Show Chart'}
                    </Button>
               </div>

               {showChart ? (
                    <div className="flex flex-col items-center justify-center h-64">
                         <div className="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-48 flex items-center justify-center">
                              <span className="text-gray-500">Chart visualization would appear here</span>
                         </div>
                         <p className="mt-4 text-sm text-gray-500">
                              Bar chart showing user payment totals
                         </p>
                    </div>
               ) : (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                         {paymentSummaries.length > 0 ? (
                              paymentSummaries.map((summary, index) => (
                                   <div
                                        key={index}
                                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                   >
                                        <div className="flex items-center space-x-3">
                                             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                  <span className="text-blue-600">💰</span>
                                             </div>
                                             <div>
                                                  <p className="font-medium text-gray-900">{summary.userName}</p>
                                                  <p className="text-sm text-gray-500">{summary.totalPayments} transactions</p>
                                             </div>
                                        </div>
                                        <div className="text-right">
                                             <p className="font-semibold text-gray-900">
                                                  {formatAmount(summary.totalAmount)}
                                             </p>
                                        </div>
                                   </div>
                              ))
                         ) : (
                              <div className="text-center py-8 text-gray-500">
                                   <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">📊</span>
                                   </div>
                                   <p>No payment data available</p>
                              </div>
                         )}
                    </div>
               )}

               <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                         <span className="font-medium text-gray-900">Total Payments</span>
                         <span className="font-bold text-lg text-green-600">
                              {formatAmount(paymentSummaries.reduce((sum, item) => sum + item.totalAmount, 0))}
                         </span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                         <span className="font-medium text-gray-900">Average Payment</span>
                         <span className="font-bold text-lg text-blue-600">
                              {formatAmount(
                                   paymentSummaries.length
                                        ? paymentSummaries.reduce((sum, item) => sum + item.totalAmount, 0) / paymentSummaries.length
                                        : 0
                              )}
                         </span>
                    </div>
               </div>
          </Card>
     );
};