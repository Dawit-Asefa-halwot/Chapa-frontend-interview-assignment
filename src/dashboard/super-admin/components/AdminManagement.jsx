import React, { useState } from 'react';
import { Card } from '@/shared/components/ui/Card';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';

export const AdminManagement = ({ admins, loading, onAddAdmin, onRemoveAdmin }) => {
     const [newAdminName, setNewAdminName] = useState('');
     const [newAdminEmail, setNewAdminEmail] = useState('');
     const [showForm, setShowForm] = useState(false);
     const [error, setError] = useState('');

     const handleAddAdmin = (e) => {
          e.preventDefault();

          if (!newAdminName.trim() || !newAdminEmail.trim()) {
               setError('Please fill in all fields');
               return;
          }

          if (!/^\S+@\S+\.\S+$/.test(newAdminEmail)) {
               setError('Please enter a valid email address');
               return;
          }

          // Check if admin already exists
          if (admins.some(admin => admin.email === newAdminEmail)) {
               setError('Admin with this email already exists');
               return;
          }

          setError('');
          onAddAdmin(newAdminName, newAdminEmail);
          setNewAdminName('');
          setNewAdminEmail('');
          setShowForm(false);
     };

     if (loading) {
          return (
               <div className="text-center py-8">
                    <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 h-12 w-12 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading admins...</p>
               </div>
          );
     }

     return (
          <Card
               title="Admin Management"
               subtitle="Add or remove administrator accounts"
               className="h-full"
          >
               <div className="space-y-4">
                    <div className="flex justify-between items-center">
                         <h4 className="font-medium text-gray-900">Current Admins</h4>
                         <Button
                              onClick={() => setShowForm(!showForm)}
                              size="sm"
                              className="flex items-center gap-2"
                         >
                              <span>➕</span>
                              Add Admin
                         </Button>
                    </div>

                    {showForm && (
                         <form onSubmit={handleAddAdmin} className="p-4 bg-gray-50 rounded-lg space-y-3">
                              {error && (
                                   <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200">
                                        {error}
                                   </div>
                              )}

                              <Input
                                   label="Name"
                                   value={newAdminName}
                                   onChange={(e) => setNewAdminName(e.target.value)}
                                   placeholder="Enter admin name"
                                   required
                              />

                              <Input
                                   label="Email"
                                   type="email"
                                   value={newAdminEmail}
                                   onChange={(e) => setNewAdminEmail(e.target.value)}
                                   placeholder="Enter admin email"
                                   required
                              />

                              <div className="flex gap-2">
                                   <Button type="submit" size="sm">
                                        Add Admin
                                   </Button>

                                   <Button
                                        type="button"
                                        variant="secondary"
                                        size="sm"
                                        onClick={() => {
                                             setShowForm(false);
                                             setError('');
                                        }}
                                   >
                                        Cancel
                                   </Button>
                              </div>
                         </form>
                    )}

                    <div className="space-y-3 max-h-80 overflow-y-auto">
                         {admins.length > 0 ? (
                              admins.map((admin) => (
                                   <div
                                        key={admin.id}
                                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                   >
                                        <div className="flex items-center space-x-3">
                                             <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                  <span className="text-blue-600">🛡️</span>
                                             </div>
                                             <div>
                                                  <p className="font-medium text-gray-900">{admin.name}</p>
                                                  <p className="text-sm text-gray-500">{admin.email}</p>
                                             </div>
                                        </div>

                                        <Button
                                             onClick={() => onRemoveAdmin(admin.id)}
                                             variant="danger"
                                             size="sm"
                                             className="flex items-center gap-2"
                                        >
                                             <span>🗑️</span>
                                             Remove
                                        </Button>
                                   </div>
                              ))
                         ) : (
                              <div className="text-center py-8 text-gray-500">
                                   <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl">👤</span>
                                   </div>
                                   <p>No admins found</p>
                                   <p className="text-sm text-gray-400 mt-2">Add new admins using the button above</p>
                              </div>
                         )}
                    </div>
               </div>
          </Card>
     );
};