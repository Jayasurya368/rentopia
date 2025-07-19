import React from 'react';
import Icon from '../../../components/AppIcon';

const RoleSelector = ({ selectedRole, onRoleChange, error }) => {
  const roles = [
    {
      value: 'seeker',
      label: 'House Seeker',
      description: 'Looking for rental properties',
      icon: 'Search'
    },
    {
      value: 'owner',
      label: 'Property Owner',
      description: 'List and manage properties',
      icon: 'Building'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        I am a <span className="text-destructive">*</span>
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {roles.map((role) => (
          <label
            key={role.value}
            className={`
              relative flex items-center p-4 border-2 rounded-lg cursor-pointer transition-smooth
              ${selectedRole === role.value
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }
            `}
          >
            <input
              type="radio"
              name="role"
              value={role.value}
              checked={selectedRole === role.value}
              onChange={(e) => onRoleChange(e.target.value)}
              className="sr-only"
            />
            <div className="flex items-center space-x-3 w-full">
              <div className={`
                w-10 h-10 rounded-lg flex items-center justify-center
                ${selectedRole === role.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
                }
              `}>
                <Icon name={role.icon} size={20} />
              </div>
              <div className="flex-1">
                <div className="font-medium text-foreground">{role.label}</div>
                <div className="text-sm text-muted-foreground">{role.description}</div>
              </div>
              {selectedRole === role.value && (
                <Icon name="Check" size={16} className="text-primary" />
              )}
            </div>
          </label>
        ))}
      </div>
      {error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default RoleSelector;