import React, { useState, useEffect } from 'react';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

export const TransactionForm = ({ onSubmit, balance }) => { // Added balance prop
     const [type, setType] = useState('credit');
     const [amount, setAmount] = useState('');
     const [phone, setPhone] = useState('');
     const [phoneError, setPhoneError] = useState('');
     const [amountError, setAmountError] = useState(''); // Added state
     const [isSubmitting, setIsSubmitting] = useState(false);
     const [submitSuccess, setSubmitSuccess] = useState(false);

     // Clear errors when inputs change
     useEffect(() => {
          setAmountError('');
     }, [amount, type]);

     const validatePhone = (value) => {
          const cleanPhone = value.replace(/\D/g, '');
          if (cleanPhone.length !== 9) {
               return 'Phone number must be exactly 9 digits';
          }
          if (!cleanPhone.startsWith('7') && !cleanPhone.startsWith('9')) {
               return 'Phone number must start with 7 or 9';
          }
          return '';
     };

     const handlePhoneChange = (e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 9) {
               setPhone(value);
               setPhoneError(validatePhone(value));
          }
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          // Clear previous errors
          setAmountError('');

          // Validate amount
          const amountNum = parseFloat(amount);
          if (isNaN(amountNum)) {
               setAmountError('Please enter a valid amount');
               return;
          }

          // Check for sufficient funds for withdrawal
          if (type === 'debit' && amountNum > balance) {
               setAmountError('Insufficient funds');
               return;
          }

          setIsSubmitting(true);
          setSubmitSuccess(false);

          try {
               const success = await onSubmit({
                    amount: amountNum,
                    type,
                    description: `${type === 'credit' ? 'Deposit' : 'Withdraw'} via mobile money to +251${phone}`
               });

               if (success) {
                    setAmount('');
                    setPhone('');
                    setPhoneError('');
                    setSubmitSuccess(true);
                    setTimeout(() => setSubmitSuccess(false), 3000);
               }
          } finally {
               setIsSubmitting(false);
          }
     };

     return (
          <div className="space-y-4">
               <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                         <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Transaction Type
                         </label>
                         <div className="grid grid-cols-2 gap-3">
                              <button
                                   type="button"
                                   onClick={() => setType('credit')}
                                   className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${type === 'credit'
                                        ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-400 text-green-700 shadow-lg'
                                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                                        }`}
                              >
                                   <span className="text-lg">➕</span>
                                   <span className="text-sm font-semibold block mt-2">Deposit</span>
                              </button>
                              <button
                                   type="button"
                                   onClick={() => setType('debit')}
                                   className={`p-4 rounded-xl border-2 transition-all duration-200 transform hover:scale-105 ${type === 'debit'
                                        ? 'bg-gradient-to-r from-red-50 to-pink-50 border-red-400 text-red-700 shadow-lg'
                                        : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                                        }`}
                              >
                                   <span className="text-lg">➖</span>
                                   <span className="text-sm font-semibold block mt-2">Withdraw</span>
                              </button>
                         </div>
                    </div>

                    <div>
                         <label className="block text-sm font-medium text-gray-700 mb-1">
                              Phone Number
                         </label>
                         <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                   <span className="text-gray-500">+251</span>
                              </div>
                              <input
                                   type="tel"
                                   value={phone}
                                   onChange={handlePhoneChange}
                                   placeholder="9XXXXXXXX"
                                   className={`w-full pl-14 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent transition-colors duration-200 ${phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-green-500'
                                        }`}
                                   required
                              />
                         </div>
                         {phoneError && (
                              <p className="mt-1 text-sm text-red-600">{phoneError}</p>
                         )}
                         <p className="mt-1 text-xs text-gray-500">
                              Enter your phone number
                         </p>
                    </div>

                    <Input
                         label="Amount"
                         type="number"
                         step="0.01"
                         min="0"
                         value={amount}
                         onChange={(e) => setAmount(e.target.value)}
                         placeholder="0.00"
                         required
                    />

                    {amountError && (
                         <p className="mt-1 text-sm text-red-600">{amountError}</p>
                    )}

                    {submitSuccess && (
                         <div>
                              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800 px-4 py-3 rounded-xl animate-pulse">
                                   <div className="flex items-center">
                                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-ping"></div>
                                        Transaction submitted successfully!
                                   </div>
                              </div>
                         </div>
                    )}

                    <Button
                         type="submit"
                         loading={isSubmitting}
                         disabled={!amount || !phone || phoneError || !!amountError}
                         className={`w-full transform hover:scale-105 transition-all duration-200 ${type === 'credit'
                              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700'
                              : 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700'
                              }`}
                         size="lg"
                    >
                         {type === 'credit' ? '💰 Submit Deposit' : '💸 Submit Withdrawal'}
                    </Button>
               </form>
          </div>
     );
};