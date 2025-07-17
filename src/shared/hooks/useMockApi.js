import { useState, useCallback } from 'react';

export const useMockApi = () => {
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState(null);

     const callApi = useCallback(async (apiFunction, ...args) => {
          setLoading(true);
          setError(null);

          try {
               // Simulate network delay
               await new Promise(resolve => setTimeout(resolve, 300));

               // Execute the API function
               const result = await apiFunction(...args);
               return result;
          } catch (err) {
               setError(err.message || 'An error occurred');
               throw err;
          } finally {
               setLoading(false);
          }
     }, []);

     return {
          loading,
          error,
          callApi,
          resetError: () => setError(null),
     };
};