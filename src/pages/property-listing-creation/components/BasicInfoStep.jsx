import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const BasicInfoStep = ({ data, onChange, errors }) => {
  const [showMap, setShowMap] = useState(false);

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'house', label: 'Independent House' },
    { value: 'studio', label: 'Studio Apartment' },
    { value: 'penthouse', label: 'Penthouse' },
    { value: 'duplex', label: 'Duplex' }
  ];

  const bhkOptions = [
    { value: '1rk', label: '1 RK' },
    { value: '1bhk', label: '1 BHK' },
    { value: '2bhk', label: '2 BHK' },
    { value: '3bhk', label: '3 BHK' },
    { value: '4bhk', label: '4 BHK' },
    { value: '5bhk', label: '5+ BHK' }
  ];

  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleAddressConfirm = () => {
    setShowMap(true);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Home" size={20} className="mr-2 text-primary" />
          Basic Property Information
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-2">
            <Input
              label="Property Title"
              type="text"
              placeholder="e.g., Spacious 2BHK Apartment in Bandra"
              value={data.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              error={errors.title}
              required
              description="Create an attractive title that highlights key features"
            />
          </div>

          <div className="lg:col-span-2">
            <Input
              label="Complete Address"
              type="text"
              placeholder="Building name, Street, Area, City, State, PIN"
              value={data.address || ''}
              onChange={(e) => handleInputChange('address', e.target.value)}
              error={errors.address}
              required
              description="Provide detailed address for accurate location mapping"
            />
            
            {data.address && (
              <div className="mt-3">
                <button
                  onClick={handleAddressConfirm}
                  className="flex items-center text-sm text-primary hover:text-primary/80 transition-smooth"
                >
                  <Icon name="MapPin" size={16} className="mr-1" />
                  Confirm location on map
                </button>
              </div>
            )}
          </div>

          <Select
            label="Property Type"
            options={propertyTypes}
            value={data.propertyType || ''}
            onChange={(value) => handleInputChange('propertyType', value)}
            error={errors.propertyType}
            placeholder="Select property type"
            required
          />

          <Select
            label="BHK Configuration"
            options={bhkOptions}
            value={data.bhk || ''}
            onChange={(value) => handleInputChange('bhk', value)}
            error={errors.bhk}
            placeholder="Select BHK type"
            required
          />

          <Input
            label="Available From"
            type="date"
            value={data.availableFrom || ''}
            onChange={(e) => handleInputChange('availableFrom', e.target.value)}
            error={errors.availableFrom}
            required
            min={new Date().toISOString().split('T')[0]}
          />

          <Input
            label="Built-up Area (sq ft)"
            type="number"
            placeholder="e.g., 1200"
            value={data.area || ''}
            onChange={(e) => handleInputChange('area', e.target.value)}
            error={errors.area}
            required
            min="100"
          />
        </div>
      </div>

      {/* Map Preview */}
      {showMap && data.address && (
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-md font-semibold text-foreground mb-4 flex items-center">
            <Icon name="Map" size={18} className="mr-2 text-primary" />
            Location Preview
          </h4>
          <div className="w-full h-64 rounded-lg overflow-hidden border border-border">
            <iframe
              width="100%"
              height="100%"
              loading="lazy"
              title="Property Location"
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps?q=19.0760,72.8777&z=14&output=embed"
              className="border-0"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Please verify this location matches your property address
          </p>
        </div>
      )}
    </div>
  );
};

export default BasicInfoStep;