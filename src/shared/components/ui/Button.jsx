import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const Button = ({
     children,
     onClick,
     type = 'button',
     variant = 'primary',
     size = 'md',
     disabled = false,
     loading = false,
     className = '',
}) => {
     const baseClasses = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

     const variantClasses = {
          primary: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white focus:ring-green-500 shadow-lg hover:shadow-xl',
          secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
          danger: 'bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white focus:ring-red-500 shadow-lg hover:shadow-xl',
          success: 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white focus:ring-green-500 shadow-lg hover:shadow-xl',
     };

     const sizeClasses = {
          sm: 'px-3 py-1.5 text-sm',
          md: 'px-4 py-2 text-sm',
          lg: 'px-6 py-3 text-base',
     };

     return (
          <button
               type={type}
               onClick={onClick}
               disabled={disabled || loading}
               className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} flex items-center justify-center gap-2 transform hover:scale-105 transition-all duration-200`}
          >
               {loading && <LoadingSpinner size="sm" />}
               {children}
          </button>
     );
};