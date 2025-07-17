import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Card } from '../../../shared/components/ui/Card';
import { Logo } from '../../../shared/components/ui/Logo';

export const LoginForm = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const { login, isLoading } = useAuth();

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError('');
          const success = await login(email, password);
          if (!success) {
               setError('Invalid email or password');
          }
     };

     const demoUsers = [
          { email: 'user@example.com', password: 'password123', role: 'User' },
          { email: 'admin@example.com', password: 'admin123', role: 'Admin' },
          { email: 'superadmin@example.com', password: 'super123', role: 'Super Admin' },
     ];

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center px-4 relative overflow-hidden">
               {/* Background elements */}
               <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
               </div>

               <div className="max-w-md w-full space-y-6">
                    <div className="text-center">
                         <div className="flex justify-center mb-6">
                              <Logo className="w-16 h-16 animate-pulse" />
                         </div>
                         <h2 className="text-3xl font-bold text-white mb-2">Welcome to ChapaPay</h2>
                         <p className="text-blue-200">Sign in to access your dashboard</p>
                    </div>

                    <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl">
                         <form onSubmit={handleSubmit} className="space-y-4">
                              <Input
                                   label="Email"
                                   type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                                   placeholder="Enter your email"
                              />

                              <Input
                                   label="Password"
                                   type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                                   placeholder="Enter your password"
                              />

                              {error && (
                                   <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 animate-shake">
                                        {error}
                                   </div>
                              )}

                              <Button
                                   type="submit"
                                   loading={isLoading}
                                   className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200"
                                   size="lg"
                              >
                                   Sign In to Dashboard
                              </Button>
                         </form>
                    </Card>

                    <Card title="Demo Accounts" className="mt-6 bg-white/90 backdrop-blur-lg border-0 shadow-xl">
                         <div className="space-y-3">
                              {demoUsers.map((user) => (
                                   <div
                                        key={user.email}
                                        className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg cursor-pointer hover:from-green-100 hover:to-emerald-100 transition-all duration-200 transform hover:scale-102 border border-green-100/50"
                                        onClick={() => {
                                             setEmail(user.email);
                                             setPassword(user.password);
                                        }}
                                   >
                                        <div className="flex justify-between items-center">
                                             <span className="font-medium text-gray-900">{user.role}</span>
                                             <span className="text-sm text-green-600">{user.email}</span>
                                        </div>
                                   </div>
                              ))}
                         </div>
                         <p className="text-xs text-green-500 mt-3">
                              Click on any demo account to auto-fill credentials
                         </p>
                    </Card>
               </div>
          </div>
     );
};