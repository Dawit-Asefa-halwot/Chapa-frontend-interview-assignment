import React from 'react';

export const Card = ({
     children,
     className = '',
     title,
     subtitle
}) => {
     return (
          <div className={`bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50 p-6 hover:shadow-xl transition-all duration-300 ${className}`}>
               {(title || subtitle) && (
                    <div className="mb-4">
                         {title && <h3 className="text-xl font-bold text-gray-900">{title}</h3>}
                         {subtitle && <p className="text-sm text-gray-600 mt-2">{subtitle}</p>}
                    </div>
               )}
               {children}
          </div>
     );
};