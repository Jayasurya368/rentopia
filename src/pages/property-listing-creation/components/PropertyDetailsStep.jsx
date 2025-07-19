import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const PropertyDetailsStep = ({ data, onChange, errors }) => {
  const [description, setDescription] = useState(data.description || '');

  const amenities = [
    { id: 'parking', label: 'Parking', icon: 'Car' },
    { id: 'gym', label: 'Gym/Fitness Center', icon: 'Dumbbell' },
    { id: 'swimming', label: 'Swimming Pool', icon: 'Waves' },
    { id: 'security', label: '24/7 Security', icon: 'Shield' },
    { id: 'elevator', label: 'Elevator', icon: 'ArrowUp' },
    { id: 'garden', label: 'Garden/Terrace', icon: 'Trees' },
    { id: 'ac', label: 'Air Conditioning', icon: 'Wind' },
    { id: 'internet', label: 'High-Speed Internet', icon: 'Wifi' },
    { id: 'power', label: 'Power Backup', icon: 'Zap' },
    { id: 'water', label: '24/7 Water Supply', icon: 'Droplets' },
    { id: 'maintenance', label: 'Maintenance Service', icon: 'Wrench' },
    { id: 'clubhouse', label: 'Clubhouse', icon: 'Building' }
  ];

  const nearbyFacilities = [
    { id: 'metro', label: 'Metro Station', icon: 'Train', distance: '0.5 km' },
    { id: 'hospital', label: 'Hospital', icon: 'Heart', distance: '1.2 km' },
    { id: 'school', label: 'School', icon: 'GraduationCap', distance: '0.8 km' },
    { id: 'mall', label: 'Shopping Mall', icon: 'ShoppingBag', distance: '2.0 km' },
    { id: 'market', label: 'Local Market', icon: 'Store', distance: '0.3 km' },
    { id: 'bank', label: 'Bank/ATM', icon: 'CreditCard', distance: '0.4 km' }
  ];

  const specialFeatures = [
    { id: 'furnished', label: 'Fully Furnished', icon: 'Sofa' },
    { id: 'semifurnished', label: 'Semi Furnished', icon: 'Package' },
    { id: 'petfriendly', label: 'Pet Friendly', icon: 'Heart' },
    { id: 'balcony', label: 'Balcony', icon: 'Sun' },
    { id: 'modular', label: 'Modular Kitchen', icon: 'ChefHat' },
    { id: 'wardrobe', label: 'Built-in Wardrobes', icon: 'Package2' }
  ];

  const handleInputChange = (field, value) => {
    onChange({ ...data, [field]: value });
  };

  const handleAmenityChange = (amenityId, checked) => {
    const currentAmenities = data.amenities || [];
    const updatedAmenities = checked
      ? [...currentAmenities, amenityId]
      : currentAmenities.filter(id => id !== amenityId);
    
    handleInputChange('amenities', updatedAmenities);
  };

  const handleFeatureChange = (featureId, checked) => {
    const currentFeatures = data.specialFeatures || [];
    const updatedFeatures = checked
      ? [...currentFeatures, featureId]
      : currentFeatures.filter(id => id !== featureId);
    
    handleInputChange('specialFeatures', updatedFeatures);
  };

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    setDescription(value);
    handleInputChange('description', value);
  };

  return (
    <div className="space-y-6">
      {/* Property Description */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2 text-primary" />
          Property Description
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Detailed Description *
            </label>
            <textarea
              value={description}
              onChange={handleDescriptionChange}
              placeholder={`Describe your property in detail. Include information about:\n• Room layouts and sizes\n• Natural lighting and ventilation\n• Nearby conveniences\n• What makes this property special\n• Any specific requirements for tenants`}
              className="w-full h-32 px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              required
            />
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-muted-foreground">
                Minimum 100 characters recommended
              </p>
              <span className={`text-sm ${description.length < 100 ? 'text-warning' : 'text-success'}`}>
                {description.length} characters
              </span>
            </div>
            {errors.description && (
              <p className="text-error text-sm mt-1">{errors.description}</p>
            )}
          </div>
        </div>
      </div>

      {/* Amenities */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Star" size={20} className="mr-2 text-primary" />
          Amenities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <Checkbox
              key={amenity.id}
              label={
                <div className="flex items-center">
                  <Icon name={amenity.icon} size={16} className="mr-2 text-primary" />
                  {amenity.label}
                </div>
              }
              checked={(data.amenities || []).includes(amenity.id)}
              onChange={(e) => handleAmenityChange(amenity.id, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Nearby Facilities */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MapPin" size={20} className="mr-2 text-primary" />
          Nearby Facilities
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {nearbyFacilities.map((facility) => (
            <div key={facility.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div className="flex items-center">
                <Icon name={facility.icon} size={16} className="mr-3 text-primary" />
                <span className="text-foreground">{facility.label}</span>
              </div>
              <span className="text-sm text-muted-foreground">{facility.distance}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Special Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Sparkles" size={20} className="mr-2 text-primary" />
          Special Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {specialFeatures.map((feature) => (
            <Checkbox
              key={feature.id}
              label={
                <div className="flex items-center">
                  <Icon name={feature.icon} size={16} className="mr-2 text-primary" />
                  {feature.label}
                </div>
              }
              checked={(data.specialFeatures || []).includes(feature.id)}
              onChange={(e) => handleFeatureChange(feature.id, e.target.checked)}
            />
          ))}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
          <Icon name="Info" size={20} className="mr-2 text-primary" />
          Additional Information
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Floor Number"
            type="number"
            placeholder="e.g., 5"
            value={data.floor || ''}
            onChange={(e) => handleInputChange('floor', e.target.value)}
            min="0"
            max="50"
          />
          
          <Input
            label="Total Floors in Building"
            type="number"
            placeholder="e.g., 15"
            value={data.totalFloors || ''}
            onChange={(e) => handleInputChange('totalFloors', e.target.value)}
            min="1"
            max="100"
          />
          
          <Input
            label="Property Age (Years)"
            type="number"
            placeholder="e.g., 5"
            value={data.propertyAge || ''}
            onChange={(e) => handleInputChange('propertyAge', e.target.value)}
            min="0"
            max="100"
          />
          
          <Input
            label="Preferred Tenant Type"
            type="text"
            placeholder="e.g., Family, Bachelor, Working Professional"
            value={data.tenantType || ''}
            onChange={(e) => handleInputChange('tenantType', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsStep;