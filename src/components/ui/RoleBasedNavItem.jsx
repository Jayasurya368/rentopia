import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import NotificationBadge from './NotificationBadge';
import { useAuth } from './AuthenticationGuard';

const RoleBasedNavItem = ({ 
  seekerConfig, 
  ownerConfig, 
  guestConfig, 
  className = '',
  onClick,
  badge,
  ...props 
}) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  const getConfig = () => {
    if (!isAuthenticated()) {
      return guestConfig;
    }
    
    if (user?.role === 'owner') {
      return ownerConfig;
    }
    
    return seekerConfig;
  };

  const config = getConfig();
  
  if (!config) return null;

  const isActive = location.pathname === config.path;

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link
      to={config.path}
      onClick={handleClick}
      className={`
        relative flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth
        ${isActive
          ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
        }
        ${className}
      `}
      {...props}
    >
      {config.icon && <Icon name={config.icon} size={16} />}
      <span>{config.label}</span>
      {config.description && (
        <span className="hidden lg:inline text-xs text-muted-foreground ml-1">
          {config.description}
        </span>
      )}
      {badge && <NotificationBadge count={badge} />}
    </Link>
  );
};

export default RoleBasedNavItem;