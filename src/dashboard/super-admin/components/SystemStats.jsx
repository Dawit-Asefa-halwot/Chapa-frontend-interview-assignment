import React from 'react';
import { Card } from '@/shared/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const SystemStats = () => {
     // Mock system statistics data
     const statsData = [
          { name: 'Total Users', value: 1254, color: '#3B82F6' },
          { name: 'Active Users', value: 982, color: '#10B981' },
          { name: 'Total Payments', value: 24580, color: '#8B5CF6' },
          { name: 'Total Revenue', value: 124580, color: '#F59E0B' },
     ];

     // Format large numbers
     const formatNumber = (num) => {
          if (num >= 1000000) {
               return `$${(num / 1000000).toFixed(1)}M`;
          }
          if (num >= 1000) {
               return `$${(num / 1000).toFixed(1)}K`;
          }
          return num;
     };

     // Chart data for active users over time
     const userGrowthData = [
          { month: 'Jan', users: 800 },
          { month: 'Feb', users: 950 },
          { month: 'Mar', users: 1100 },
          { month: 'Apr', users: 1050 },
          { month: 'May', users: 1200 },
          { month: 'Jun', users: 1250 },
     ];

     return (
          <Card title="System Overview" subtitle="Key performance metrics">
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {statsData.map((stat, index) => (
                         <div
                              key={index}
                              className="p-4 rounded-xl border border-gray-200 flex flex-col"
                              style={{ backgroundColor: `${stat.color}10` }}
                         >
                              <h3 className="text-lg font-medium text-gray-900">{stat.name}</h3>
                              <p
                                   className="text-3xl font-bold mt-2"
                                   style={{ color: stat.color }}
                              >
                                   {formatNumber(stat.value)}
                              </p>
                         </div>
                    ))}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-gray-50 p-4 rounded-xl">
                         <h3 className="text-lg font-medium text-gray-900 mb-4">User Growth</h3>
                         <div className="h-64">
                              <ResponsiveContainer width="100%" height="100%">
                                   <BarChart data={userGrowthData}>
                                        <XAxis dataKey="month" />
                                        <YAxis />
                                        <Tooltip
                                             formatter={(value) => [`${value} users`, 'Active Users']}
                                             labelFormatter={(label) => `Month: ${label}`}
                                        />
                                        <Bar dataKey="users" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                                   </BarChart>
                              </ResponsiveContainer>
                         </div>
                    </div>

                    <div className="space-y-4">
                         <div className="bg-gray-50 p-4 rounded-xl">
                              <h3 className="text-lg font-medium text-gray-900 mb-4">System Health</h3>
                              <div className="space-y-3">
                                   <div>
                                        <div className="flex justify-between mb-1">
                                             <span className="text-sm font-medium text-gray-700">Server Uptime</span>
                                             <span className="text-sm font-medium text-green-600">99.98%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                             <div
                                                  className="bg-green-600 h-2 rounded-full"
                                                  style={{ width: '99.98%' }}
                                             ></div>
                                        </div>
                                   </div>

                                   <div>
                                        <div className="flex justify-between mb-1">
                                             <span className="text-sm font-medium text-gray-700">API Response Time</span>
                                             <span className="text-sm font-medium text-green-600">142ms</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                             <div
                                                  className="bg-blue-600 h-2 rounded-full"
                                                  style={{ width: '85%' }}
                                             ></div>
                                        </div>
                                   </div>

                                   <div>
                                        <div className="flex justify-between mb-1">
                                             <span className="text-sm font-medium text-gray-700">Error Rate</span>
                                             <span className="text-sm font-medium text-green-600">0.12%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                             <div
                                                  className="bg-yellow-500 h-2 rounded-full"
                                                  style={{ width: '0.12%' }}
                                             ></div>
                                        </div>
                                   </div>
                              </div>
                         </div>

                         <div className="bg-gray-50 p-4 rounded-xl">
                              <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                              <div className="space-y-3">
                                   <div className="flex items-start space-x-3">
                                        <div className="bg-blue-100 p-2 rounded-full">
                                             <span className="text-blue-600">👤</span>
                                        </div>
                                        <div>
                                             <p className="font-medium">New admin added</p>
                                             <p className="text-sm text-gray-500">Jane Smith was added as admin</p>
                                             <p className="text-xs text-gray-400">2 hours ago</p>
                                        </div>
                                   </div>

                                   <div className="flex items-start space-x-3">
                                        <div className="bg-green-100 p-2 rounded-full">
                                             <span className="text-green-600">🔄</span>
                                        </div>
                                        <div>
                                             <p className="font-medium">System update</p>
                                             <p className="text-sm text-gray-500">Version 2.3.1 deployed</p>
                                             <p className="text-xs text-gray-400">Yesterday</p>
                                        </div>
                                   </div>
                              </div>
                         </div>
                    </div>
               </div>
          </Card>
     );
};