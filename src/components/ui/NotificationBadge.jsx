import React from 'react';

const NotificationBadge = ({ count, className = '', size = 'default', variant = 'default' }) => {
  if (!count || count <= 0) return null;

  const sizeClasses = {
    sm: 'h-4 w-4 text-xs',
    default: 'h-5 w-5 text-xs',
    lg: 'h-6 w-6 text-sm',
  };

  const variantClasses = {
    default: 'bg-accent text-accent-foreground',
    primary: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
  };

  const displayCount = count > 99 ? '99+' : count.toString();

  return (
    <span
      className={`
        absolute -top-1 -right-1 
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        rounded-full 
        flex items-center justify-center 
        font-medium 
        border-2 border-background
        shadow-sm
        transition-smooth
        ${className}
      `}
    >
      {displayCount}
    </span>
  );
};

export default NotificationBadge;