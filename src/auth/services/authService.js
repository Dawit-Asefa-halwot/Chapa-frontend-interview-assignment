import { mockUsers, mockCredentials } from "@shared/services/mockData";

class AuthService {
     async login(email, password) {
          await new Promise(resolve => setTimeout(resolve, 1000));

          const validPassword = mockCredentials[email];
          if (!validPassword || validPassword !== password) {
               throw new Error('Invalid credentials');
          }

          const user = mockUsers.find(u => u.email === email);
          if (!user) {
               throw new Error('User not found');
          }

          if (!user.isActive) {
               throw new Error('Account is deactivated');
          }

          return user;
     }
}

export const authService = new AuthService();