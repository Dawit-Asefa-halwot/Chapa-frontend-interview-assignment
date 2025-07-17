import React from 'react';
import { Button } from '../shared/components/ui/Button';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage = () => {
     const navigate = useNavigate();

     return (
          <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
               <h1 className="text-9xl font-bold text-gray-300">404</h1>
               <p className="text-2xl font-medium text-gray-600 mb-8">Page not found</p>
               <Button onClick={() => navigate('/')} variant="primary">
                    Go to Dashboard
               </Button>
          </div>
     );
};