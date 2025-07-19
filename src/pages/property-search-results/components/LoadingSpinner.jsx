import React from 'react';

const LoadingSpinner = ({ size = 'default', className = '' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    default: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`
        ${sizeClasses[size]} 
        border-2 border-primary border-t-transparent 
        rounded-full animate-spin
      `} />
    </div>
  );
};

export default LoadingSpinner;