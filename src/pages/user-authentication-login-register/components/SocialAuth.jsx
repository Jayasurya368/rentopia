import React from 'react';
import Button from '../../../components/ui/Button';


const SocialAuth = ({ onSocialLogin, loading }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'bg-white border-border text-foreground hover:bg-muted'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'bg-blue-600 border-blue-600 text-white hover:bg-blue-700'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {socialProviders.map((provider) => (
          <Button
            key={provider.name}
            variant="outline"
            size="default"
            onClick={() => onSocialLogin(provider.name.toLowerCase())}
            disabled={loading}
            iconName={provider.icon}
            iconPosition="left"
            iconSize={18}
            className={`${provider.color} transition-smooth`}
          >
            {provider.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default SocialAuth;