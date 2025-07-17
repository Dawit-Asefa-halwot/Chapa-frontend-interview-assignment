import { mockUsers } from '../mockData';

class UserService {
     async getAllUsers() {
          await new Promise(resolve => setTimeout(resolve, 500));
          return [...mockUsers];
     }

     async updateUser(userId, updates) {
          await new Promise(resolve => setTimeout(resolve, 300));

          const userIndex = mockUsers.findIndex(u => u.id === userId);
          if (userIndex === -1) {
               throw new Error('User not found');
          }

          mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
          return mockUsers[userIndex];
     }

     async createUser(userData) {
          await new Promise(resolve => setTimeout(resolve, 500));

          const newUser = {
               ...userData,
               id: Date.now().toString(),
               joinDate: new Date().toISOString().split('T')[0],
          };

          mockUsers.push(newUser);
          return newUser;
     }

     async deleteUser(userId) {
          await new Promise(resolve => setTimeout(resolve, 300));

          const userIndex = mockUsers.findIndex(u => u.id === userId);
          if (userIndex === -1) {
               throw new Error('User not found');
          }

          mockUsers.splice(userIndex, 1);
     }
}

export const userService = new UserService();