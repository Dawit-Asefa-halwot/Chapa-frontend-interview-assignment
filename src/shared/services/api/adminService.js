import { mockUsers } from '../mockData';

class AdminService {
     async getAdmins() {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 600));

          // Filter and return only admin users
          return mockUsers.filter(user => user.role === 'admin');
     }

     async addAdmin(userData) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 800));

          // Create new admin user
          const newAdmin = {
               ...userData,
               id: `admin-${Date.now()}`,
               role: 'admin',
               isActive: true,
               joinDate: new Date().toISOString().split('T')[0],
          };

          // Add to mock data
          mockUsers.push(newAdmin);
          return newAdmin;
     }

     async removeAdmin(adminId) {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 500));

          // Find index of admin to remove
          const index = mockUsers.findIndex(user => user.id === adminId && user.role === 'admin');

          if (index === -1) {
               throw new Error('Admin not found');
          }

          // Remove from mock data
          mockUsers.splice(index, 1);
          return { success: true };
     }

     async getSystemStats() {
          // Simulate API delay
          await new Promise(resolve => setTimeout(resolve, 700));

          // Calculate system statistics
          const totalUsers = mockUsers.filter(u => u.role === 'user').length;
          const activeUsers = mockUsers.filter(u => u.role === 'user' && u.isActive).length;

          return {
               totalUsers,
               activeUsers,
               totalPayments: 24580,
               totalRevenue: 124580,
               avgTransactionValue: 68.5,
          };
     }
}

export const adminService = new AdminService();