import React from 'react';
import Button from '../../../components/ui/Button';

const AuthToggle = ({ activeMode, onModeChange }) => {
  return (
    <div className="flex bg-muted rounded-lg p-1 mb-8">
      <Button
        variant={activeMode === 'login' ? 'default' : 'ghost'}
        size="sm"
        fullWidth
        onClick={() => onModeChange('login')}
        className="rounded-md"
      >
        Login
      </Button>
      <Button
        variant={activeMode === 'register' ? 'default' : 'ghost'}
        size="sm"
        fullWidth
        onClick={() => onModeChange('register')}
        className="rounded-md"
      >
        Register
      </Button>
    </div>
  );
};

export default AuthToggle;