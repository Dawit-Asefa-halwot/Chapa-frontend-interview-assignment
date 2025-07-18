import React from 'react';
import { Button } from '@/shared/components/ui/Button';

export const UserManagement = ({ users, loading, onToggleStatus }) => {
     if (loading) {
          return (
               <div className="text-center py-8">
                    <div className="animate-spin rounded-full border-4 border-gray-300 border-t-blue-600 h-12 w-12 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading users...</p>
               </div>
          );
     }

     return (
          <div className="space-y-4">
               <h3 className="text-lg font-semibold text-gray-900">User Management</h3>
               <div className="space-y-3">
                    {users.length === 0 ? (
                         <div className="text-center py-8 text-gray-500">
                              <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                                   <span className="text-2xl">👥</span>
                              </div>
                              <p>No users found</p>
                         </div>
                    ) : (
                         users.map((user) => (
                              <div
                                   key={user.id}
                                   className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                              >
                                   <div className="flex items-center space-x-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${user.isActive ? 'bg-green-100' : 'bg-red-100'
                                             }`}>
                                             {user.isActive ? <span>✅</span> : <span>❌</span>}
                                        </div>
                                        <div>
                                             <p className="font-medium text-gray-900">{user.name}</p>
                                             <p className="text-sm text-gray-500">{user.email}</p>
                                        </div>
                                   </div>
                                   <div className="flex items-center space-x-3">
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                             }`}>
                                             {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                        <Button
                                             onClick={() => onToggleStatus(user.id, user.isActive)}
                                             variant={user.isActive ? 'danger' : 'success'}
                                             size="sm"
                                        >
                                             {user.isActive ? 'Deactivate' : 'Activate'}
                                        </Button>
                                   </div>
                              </div>
                         ))
                    )}
               </div>
          </div>
     );
};