import React, { useState } from 'react';
import { useAuth } from '@/auth/hooks/useAuth';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { Card } from '@/shared/components/ui/Card';
import { Logo } from '@/shared/components/ui/Logo';
import { useNavigate } from 'react-router-dom';

export const LoginForm = () => {
     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');
     const { login, isLoading } = useAuth();
     const navigate = useNavigate();

     const handleSubmit = async (e) => {
          e.preventDefault();
          setError('');
          const success = await login(email, password);
          if (success) {
               navigate('/');
          } else {
               setError('Invalid email or password');
          }
     };

     const demoUsers = [
          { email: 'user@example.com', password: 'password123', role: 'User', icon: '👤' },
          { email: 'admin@example.com', password: 'admin123', role: 'Admin', icon: '🛡️' },
          { email: 'superadmin@example.com', password: 'super123', role: 'Super Admin', icon: '👑' },
     ];

     return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col md:flex-row items-center justify-center p-4 relative overflow-hidden">
               {/* Background elements */}
               <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
               </div>

               {/* Branding Section - Left Side */}
               <div className="w-full md:w-1/2 flex flex-col items-center justify-center mb-10 md:mb-0 md:pr-8 z-10">
                    <div className="text-center max-w-md">
                         <div className="flex justify-center mb-6">
                              <Logo className="w-24 h-24 animate-pulse" />
                         </div>
                         <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to ChapaPay</h1>
                         <p className="text-xl text-blue-200 mb-8">Secure payments made simple</p>

                         <div className="space-y-6 mt-10">
                              <div className="flex items-center">
                                   <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                                        <span className="text-xl">🔒</span>
                                   </div>
                                   <div>
                                        <h3 className="text-lg font-semibold text-white">Bank-Level Security</h3>
                                        <p className="text-blue-100">Your data is encrypted and protected</p>
                                   </div>
                              </div>

                              <div className="flex items-center">
                                   <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mr-4">
                                        <span className="text-xl">⚡</span>
                                   </div>
                                   <div>
                                        <h3 className="text-lg font-semibold text-white">Lightning Fast</h3>
                                        <p className="text-blue-100">Transactions completed in seconds</p>
                                   </div>
                              </div>

                              <div className="flex items-center">
                                   <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                                        <span className="text-xl">🌍</span>
                                   </div>
                                   <div>
                                        <h3 className="text-lg font-semibold text-white">Global Reach</h3>
                                        <p className="text-blue-100">Send and receive payments worldwide</p>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>

               {/* Form Section - Right Side */}
               <div className="w-full md:w-1/2 max-w-md z-10">
                    <Card className="bg-white/95 backdrop-blur-lg border-0 shadow-2xl transform transition-transform duration-300 hover:scale-[1.02]">
                         <form onSubmit={handleSubmit} className="space-y-6">
                              <div className="text-center mb-6">
                                   <h2 className="text-2xl font-bold text-gray-800">Sign in to Dashboard</h2>
                                   <p className="text-gray-600 mt-2">Access your account to manage payments</p>
                              </div>

                              <Input
                                   label="Email"
                                   type="email"
                                   value={email}
                                   onChange={(e) => setEmail(e.target.value)}
                                   required
                                   placeholder="Enter your email"
                                   className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />

                              <Input
                                   label="Password"
                                   type="password"
                                   value={password}
                                   onChange={(e) => setPassword(e.target.value)}
                                   required
                                   placeholder="Enter your password"
                                   className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />

                              {error && (
                                   <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg border border-red-200 animate-shake">
                                        {error}
                                   </div>
                              )}

                              <div className="flex items-center justify-between">
                                   <label className="flex items-center text-sm text-gray-700">
                                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
                                        <span className="ml-2">Remember me</span>
                                   </label>

                                   <a href="#" className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
                                        Forgot password?
                                   </a>
                              </div>

                              <Button
                                   type="submit"
                                   loading={isLoading}
                                   className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all duration-200 py-3 text-lg font-semibold"
                              >
                                   Sign In to Dashboard
                              </Button>

                              <div className="relative my-6">
                                   <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                   </div>
                                   <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or try a demo account</span>
                                   </div>
                              </div>
                         </form>
                    </Card>

                    <Card title="Demo Accounts" className="mt-6 bg-white/90 backdrop-blur-lg border-0 shadow-xl">
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                              {demoUsers.map((user) => (
                                   <div
                                        key={user.email}
                                        className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl cursor-pointer hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 border border-blue-100/50 flex flex-col items-center"
                                        onClick={() => {
                                             setEmail(user.email);
                                             setPassword(user.password);
                                        }}
                                   >
                                        <div className="text-2xl mb-2">{user.icon}</div>
                                        <span className="font-medium text-gray-900 text-center">{user.role}</span>
                                        <span className="text-xs text-blue-600 text-center truncate w-full mt-1">
                                             {user.email}
                                        </span>
                                   </div>
                              ))}
                         </div>
                         <p className="text-xs text-blue-500 mt-3 text-center">
                              Click to auto-fill credentials
                         </p>
                    </Card>

                    <div className="mt-6 text-center text-sm text-blue-100">
                         <p>Don't have an account? <a href="#" className="font-semibold text-white hover:underline">Contact support</a></p>
                         <p className="mt-2">© 2023 ChapaPay. All rights reserved.</p>
                    </div>
               </div>
          </div>
     );
};