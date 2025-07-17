import React from 'react';

export const LoadingSpinner = ({
     size = 'md',
     className = ''
}) => {
     const sizeClasses = {
          sm: 'w-4 h-4',
          md: 'w-6 h-6',
          lg: 'w-8 h-8',
     };

     return (
          <div className={`${sizeClasses[size]} ${className}`}>
               <div className="animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
          </div>
     );
};