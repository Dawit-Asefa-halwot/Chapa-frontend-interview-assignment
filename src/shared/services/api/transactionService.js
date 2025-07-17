import { mockTransactions } from '../mockData';

class TransactionService {
     async getAllTransactions() {
          await new Promise(resolve => setTimeout(resolve, 500));
          return [...mockTransactions];
     }

     async getUserTransactions(userId) {
          await new Promise(resolve => setTimeout(resolve, 300));
          return mockTransactions
               .filter(t => t.userId === userId)
               .sort((a, b) => new Date(b.date) - new Date(a.date));
     }

     async createTransaction(transaction) {
          await new Promise(resolve => setTimeout(resolve, 800));

          const newTransaction = {
               ...transaction,
               id: Date.now().toString(),
               date: new Date().toISOString(),
          };

          mockTransactions.push(newTransaction);
          return newTransaction;
     }
}

export const transactionService = new TransactionService();