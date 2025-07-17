import React from 'react';
import { useAuth } from '../../../auth/hooks/useAuth';
import { Button } from '../ui/Button';
import { Logo } from '../ui/Logo';

export const DashboardLayout = ({ title, children }) => {
     const { user, logout } = useAuth();

     const getRoleIcon = () => {
          switch (user?.role) {
               case 'super-admin':
                    return <div className="w-5 h-5 text-purple-600">👑</div>;
               case 'admin':
                    return <div className="w-5 h-5 text-blue-600">🛡️</div>;
               default:
                    return <div className="w-5 h-5 text-green-600">👤</div>;
          }
     };

     const getRoleColor = () => {
          switch (user?.role) {
               case 'super-admin':
                    return 'bg-purple-100 text-purple-800';
               case 'admin':
                    return 'bg-blue-100 text-blue-800';
               default:
                    return 'bg-green-100 text-green-800';
          }
     };

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
               <header className="bg-white/80 backdrop-blur-lg shadow-lg border-b border-blue-100/50 sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                         <div className="flex justify-between items-center h-16">
                              <div className="flex items-center space-x-3">
                                   <Logo className="w-10 h-10" />
                                   <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                        ChapaPay
                                   </h1>
                              </div>

                              <div className="flex items-center space-x-4">
                                   <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-full px-4 py-2 border border-blue-100/50">
                                        {getRoleIcon()}
                                        <div className="text-sm">
                                             <p className="font-medium text-gray-900">{user?.name}</p>
                                             <p className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor()}`}>
                                                  {user?.role?.replace('-', ' ')}
                                             </p>
                                        </div>
                                   </div>

                                   <Button
                                        onClick={logout}
                                        variant="danger"
                                        size="sm"
                                        className="flex items-center gap-2 hover:scale-105 transition-transform duration-200"
                                   >
                                        <span>🚪</span>
                                        Sign Out
                                   </Button>
                              </div>
                         </div>
                    </div>
               </header>

               <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {children}
               </main>
          </div>
     );
};