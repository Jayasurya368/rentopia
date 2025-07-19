import React from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PricingStep = ({ data, onChange, errors }) => {
  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const rentAmount = data.rent || 0;
  const securityDeposit = data.securityDeposit || 0;
  const maintenanceCharges = data.maintenanceCharges || 0;
  const totalAmount = rentAmount + maintenanceCharges;

  return (
    <div className="space-y-6">
      {/* Pricing Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="DollarSign" size={20} className="mr-2 text-primary" />
          Pricing Details
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Input
              label="Monthly Rent (₹)"
              type="number"
              placeholder="e.g., 25000"
              value={data.rent || ''}
              onChange={(e) => handleInputChange('rent', parseInt(e.target.value) || 0)}
              error={errors.rent}
              required
              min="1000"
              description="Enter the monthly rental amount"
            />
            {rentAmount > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {formatCurrency(rentAmount)} per month
              </p>
            )}
          </div>
          
          <div>
            <Input
              label="Security Deposit (₹)"
              type="number"
              placeholder="e.g., 50000"
              value={data.securityDeposit || ''}
              onChange={(e) => handleInputChange('securityDeposit', parseInt(e.target.value) || 0)}
              error={errors.securityDeposit}
              required
              min="0"
              description="Refundable security deposit amount"
            />
            {securityDeposit > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {formatCurrency(securityDeposit)} (Refundable)
              </p>
            )}
          </div>
          
          <div>
            <Input
              label="Maintenance Charges (₹)"
              type="number"
              placeholder="e.g., 2000"
              value={data.maintenanceCharges || ''}
              onChange={(e) => handleInputChange('maintenanceCharges', parseInt(e.target.value) || 0)}
              min="0"
              description="Monthly maintenance charges (if any)"
            />
            {maintenanceCharges > 0 && (
              <p className="text-sm text-muted-foreground mt-1">
                {formatCurrency(maintenanceCharges)} per month
              </p>
            )}
          </div>
          
          <div>
            <Input
              label="Brokerage (₹)"
              type="number"
              placeholder="e.g., 10000"
              value={data.brokerage || ''}
              onChange={(e) => handleInputChange('brokerage', parseInt(e.target.value) || 0)}
              min="0"
              description="One-time brokerage fee (if any)"
            />
          </div>
        </div>
      </div>

      {/* Payment Terms */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Calendar" size={20} className="mr-2 text-primary" />
          Payment Terms
        </h3>
        
        <div className="space-y-4">
          <Checkbox
            label="Electricity charges included in rent"
            checked={data.electricityIncluded || false}
            onChange={(e) => handleInputChange('electricityIncluded', e.target.checked)}
          />
          
          <Checkbox
            label="Water charges included in rent"
            checked={data.waterIncluded || false}
            onChange={(e) => handleInputChange('waterIncluded', e.target.checked)}
          />
          
          <Checkbox
            label="Internet charges included in rent"
            checked={data.internetIncluded || false}
            onChange={(e) => handleInputChange('internetIncluded', e.target.checked)}
          />
          
          <Checkbox
            label="Negotiable rent"
            checked={data.negotiable || false}
            onChange={(e) => handleInputChange('negotiable', e.target.checked)}
          />
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Calculator" size={20} className="mr-2 text-primary" />
          Pricing Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-foreground">Monthly Rent:</span>
            <span className="font-semibold text-foreground">
              {formatCurrency(rentAmount)}
            </span>
          </div>
          
          {maintenanceCharges > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-foreground">Maintenance Charges:</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(maintenanceCharges)}
              </span>
            </div>
          )}
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-foreground">Total Monthly:</span>
              <span className="text-lg font-bold text-primary">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>
          
          <div className="border-t border-border pt-3">
            <div className="flex justify-between items-center">
              <span className="text-foreground">Security Deposit:</span>
              <span className="font-semibold text-foreground">
                {formatCurrency(securityDeposit)}
              </span>
            </div>
          </div>
          
          <div className="bg-muted rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-foreground mb-2">Move-in Cost Breakdown:</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>First Month Rent:</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Security Deposit:</span>
                <span>{formatCurrency(securityDeposit)}</span>
              </div>
              {data.brokerage > 0 && (
                <div className="flex justify-between">
                  <span>Brokerage:</span>
                  <span>{formatCurrency(data.brokerage)}</span>
                </div>
              )}
              <div className="border-t border-border pt-2 font-semibold">
                <div className="flex justify-between">
                  <span>Total Move-in Cost:</span>
                  <span>{formatCurrency(totalAmount + securityDeposit + (data.brokerage || 0))}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingStep;