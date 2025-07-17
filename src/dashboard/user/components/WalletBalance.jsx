import React from 'react';

export const WalletBalance = ({ balance }) => {
     const formatAmount = (amount) => {
          return new Intl.NumberFormat('en-US', {
               style: 'currency',
               currency: 'USD',
          }).format(amount);
     };

     return (
          <div className="bg-gradient-to-br from-green-600 via-emerald-700 to-green-700 text-white border-0 shadow-2xl transform hover:scale-105 transition-all duration-300 relative overflow-hidden p-6 rounded-2xl">
               <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"></div>
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
               <div className="flex items-center justify-between relative">
                    <div>
                         <p className="text-green-100 text-sm font-medium mb-2">Total Wallet Balance</p>
                         <p className="text-4xl font-bold mt-2 animate-pulse">
                              {formatAmount(balance)}
                         </p>
                         <p className="text-green-200 text-sm mt-2">Available for transactions</p>
                    </div>
                    <div className="bg-white/20 backdrop-blur-sm p-4 rounded-2xl">
                         <div className="w-10 h-10">💰</div>
                    </div>
               </div>
          </div>
     );
};