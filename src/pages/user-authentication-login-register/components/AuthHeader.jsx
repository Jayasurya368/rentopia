import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ mode }) => {
  const getHeaderContent = () => {
    if (mode === 'login') {
      return {
        title: 'Welcome back to Rentopia',
        subtitle: 'Sign in to your account to continue your property journey'
      };
    }
    return {
      title: 'Join Rentopia today',
      subtitle: 'Create your account and start finding your perfect rental home'
    };
  };

  const { title, subtitle } = getHeaderContent();

  return (
    <div className="text-center mb-8">
      <Link to="/" className="inline-flex items-center space-x-2 text-primary hover:text-primary/80 transition-smooth mb-6">
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Home" size={24} color="white" />
        </div>
        <span className="text-2xl font-bold text-foreground">Rentopia</span>
      </Link>
      
      <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
        {title}
      </h1>
      <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthHeader;