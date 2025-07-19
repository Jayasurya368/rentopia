import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ 
  filters, 
  onFiltersChange, 
  onClose, 
  isOpen, 
  className = '' 
}) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const propertyTypes = [
    { value: 'apartment', label: 'Apartment' },
    { value: 'villa', label: 'Villa' },
    { value: 'house', label: 'Independent House' },
    { value: 'studio', label: 'Studio' },
    { value: 'penthouse', label: 'Penthouse' }
  ];

  const bhkOptions = [
    { value: '1', label: '1 BHK' },
    { value: '2', label: '2 BHK' },
    { value: '3', label: '3 BHK' },
    { value: '4', label: '4 BHK' },
    { value: '5+', label: '5+ BHK' }
  ];

  const amenities = [
    'Parking', 'Gym', 'Swimming Pool', 'Security', 'Power Backup',
    'Lift', 'Garden', 'Club House', 'Children Play Area', 'Maintenance Staff'
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
  };

  const handleAmenityToggle = (amenity) => {
    const currentAmenities = localFilters.amenities || [];
    const updatedAmenities = currentAmenities.includes(amenity)
      ? currentAmenities.filter(a => a !== amenity)
      : [...currentAmenities, amenity];
    
    handleFilterChange('amenities', updatedAmenities);
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      location: '',
      minPrice: '',
      maxPrice: '',
      propertyTypes: [],
      bhk: [],
      amenities: [],
      availableFrom: ''
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const FilterSection = ({ title, children, defaultOpen = true }) => {
    const [isExpanded, setIsExpanded] = useState(defaultOpen);

    return (
      <div className="border-b border-border pb-4 mb-4 last:border-b-0 last:pb-0 last:mb-0">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left mb-3"
        >
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="text-muted-foreground"
          />
        </button>
        {isExpanded && children}
      </div>
    );
  };

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">Filters</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearFilters}
          >
            Clear All
          </Button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1 hover:bg-muted rounded transition-smooth lg:hidden"
            >
              <Icon name="X" size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Filter Content */}
      <div className="p-4 space-y-4 max-h-96 lg:max-h-none overflow-y-auto">
        {/* Location */}
        <FilterSection title="Location">
          <Input
            type="text"
            placeholder="Enter city, area, or landmark"
            value={localFilters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          />
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range (₹/month)">
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              placeholder="Min price"
              value={localFilters.minPrice || ''}
              onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            />
            <Input
              type="number"
              placeholder="Max price"
              value={localFilters.maxPrice || ''}
              onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            />
          </div>
        </FilterSection>

        {/* Property Type */}
        <FilterSection title="Property Type">
          <div className="space-y-2">
            {propertyTypes.map((type) => (
              <Checkbox
                key={type.value}
                label={type.label}
                checked={(localFilters.propertyTypes || []).includes(type.value)}
                onChange={(e) => {
                  const currentTypes = localFilters.propertyTypes || [];
                  const updatedTypes = e.target.checked
                    ? [...currentTypes, type.value]
                    : currentTypes.filter(t => t !== type.value);
                  handleFilterChange('propertyTypes', updatedTypes);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* BHK Configuration */}
        <FilterSection title="BHK Configuration">
          <div className="space-y-2">
            {bhkOptions.map((option) => (
              <Checkbox
                key={option.value}
                label={option.label}
                checked={(localFilters.bhk || []).includes(option.value)}
                onChange={(e) => {
                  const currentBhk = localFilters.bhk || [];
                  const updatedBhk = e.target.checked
                    ? [...currentBhk, option.value]
                    : currentBhk.filter(b => b !== option.value);
                  handleFilterChange('bhk', updatedBhk);
                }}
              />
            ))}
          </div>
        </FilterSection>

        {/* Amenities */}
        <FilterSection title="Amenities">
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {amenities.map((amenity) => (
              <Checkbox
                key={amenity}
                label={amenity}
                checked={(localFilters.amenities || []).includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
              />
            ))}
          </div>
        </FilterSection>

        {/* Available From */}
        <FilterSection title="Available From">
          <Input
            type="date"
            value={localFilters.availableFrom || ''}
            onChange={(e) => handleFilterChange('availableFrom', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </FilterSection>
      </div>

      {/* Apply Button (Mobile) */}
      <div className="p-4 border-t border-border lg:hidden">
        <Button
          variant="default"
          fullWidth
          onClick={handleApplyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterPanel;