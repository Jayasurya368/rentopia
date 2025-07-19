import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'Add New Property',
      icon: 'Plus',
      variant: 'default',
      onClick: () => navigate('/property-listing-creation'),
      primary: true
    },
    {
      label: 'Manage Listings',
      icon: 'Settings',
      variant: 'outline',
      onClick: () => {
        // Scroll to properties section
        document.getElementById('properties-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      label: 'View Analytics',
      icon: 'BarChart3',
      variant: 'outline',
      onClick: () => {
        // Scroll to analytics section
        document.getElementById('analytics-section')?.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      label: 'Messages',
      icon: 'MessageCircle',
      variant: 'outline',
      onClick: () => navigate('/real-time-chat-interface')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-card">
      <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant={action.variant}
            onClick={action.onClick}
            iconName={action.icon}
            iconPosition="left"
            fullWidth
            className={action.primary ? 'font-medium' : ''}
          >
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;