import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps }) => {
  const steps = [
    { id: 1, title: 'Basic Info', icon: 'Home' },
    { id: 2, title: 'Photos', icon: 'Camera' },
    { id: 3, title: 'Details', icon: 'FileText' },
    { id: 4, title: 'Pricing', icon: 'DollarSign' }
  ];

  return (
    <div className="w-full bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center border-2 transition-smooth
                ${currentStep >= step.id 
                  ? 'bg-primary border-primary text-primary-foreground' 
                  : currentStep === step.id 
                    ? 'bg-primary/10 border-primary text-primary' :'bg-muted border-border text-muted-foreground'
                }
              `}>
                {currentStep > step.id ? (
                  <Icon name="Check" size={20} />
                ) : (
                  <Icon name={step.icon} size={20} />
                )}
              </div>
              <span className={`
                mt-2 text-sm font-medium transition-smooth
                ${currentStep >= step.id ? 'text-primary' : 'text-muted-foreground'}
              `}>
                {step.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`
                flex-1 h-0.5 mx-4 transition-smooth
                ${currentStep > step.id ? 'bg-primary' : 'bg-border'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;