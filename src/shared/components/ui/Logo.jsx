import React from 'react';

export const Logo = ({ className = "w-8 h-8" }) => {
     return (
          <div className={`${className} relative`}>
               <svg viewBox="0 0 40 40" className="w-full h-full">
                    <defs>
                         <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#10B981" />
                              <stop offset="50%" stopColor="#059669" />
                              <stop offset="100%" stopColor="#047857" />
                         </linearGradient>
                    </defs>

                    <circle
                         cx="20"
                         cy="20"
                         r="18"
                         fill="url(#logoGradient)"
                         className="drop-shadow-lg"
                    />

                    <path
                         d="M28 20 C28 24.4 24.4 28 20 28 C15.6 28 12 24.4 12 20 C12 15.6 15.6 12 20 12 C22.2 12 24.2 12.8 25.6 14.2"
                         fill="none"
                         stroke="white"
                         strokeWidth="3"
                         strokeLinecap="round"
                         opacity="0.9"
                    />

                    <circle
                         cx="26"
                         cy="14"
                         r="2"
                         fill="white"
                         opacity="0.8"
                    />
               </svg>
          </div>
     );
};