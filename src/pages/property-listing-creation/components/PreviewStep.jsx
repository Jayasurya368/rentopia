import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PreviewStep = ({ data, onEdit }) => {
  const formatCurrency = (value) => {
    if (!value) return '₹0';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const amenityIcons = {
    parking: 'Car',
    gym: 'Dumbbell',
    swimming: 'Waves',
    security: 'Shield',
    elevator: 'ArrowUp',
    garden: 'Trees',
    ac: 'Wind',
    internet: 'Wifi',
    power: 'Zap',
    water: 'Droplets',
    maintenance: 'Wrench',
    clubhouse: 'Building'
  };

  const featureIcons = {
    furnished: 'Sofa',
    semifurnished: 'Package',
    petfriendly: 'Heart',
    balcony: 'Sun',
    modular: 'ChefHat',
    wardrobe: 'Package2'
  };

  const amenityLabels = {
    parking: 'Parking',
    gym: 'Gym/Fitness Center',
    swimming: 'Swimming Pool',
    security: '24/7 Security',
    elevator: 'Elevator',
    garden: 'Garden/Terrace',
    ac: 'Air Conditioning',
    internet: 'High-Speed Internet',
    power: 'Power Backup',
    water: '24/7 Water Supply',
    maintenance: 'Maintenance Service',
    clubhouse: 'Clubhouse'
  };

  const featureLabels = {
    furnished: 'Fully Furnished',
    semifurnished: 'Semi Furnished',
    petfriendly: 'Pet Friendly',
    balcony: 'Balcony',
    modular: 'Modular Kitchen',
    wardrobe: 'Built-in Wardrobes'
  };

  const totalMonthly = (data.rent || 0) + (data.maintenanceCharges || 0);
  const moveInCost = totalMonthly + (data.securityDeposit || 0) + (data.brokerage || 0);

  return (
    <div className="space-y-6">
      {/* Preview Header */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center">
            <Icon name="Eye" size={20} className="mr-2 text-primary" />
            Listing Preview
          </h3>
          <p className="text-sm text-muted-foreground">
            This is how your listing will appear to property seekers
          </p>
        </div>
      </div>

      {/* Property Card Preview */}
      <div className="bg-card border border-border rounded-lg overflow-hidden shadow-card">
        {/* Photo Gallery */}
        {data.photos && data.photos.length > 0 && (
          <div className="relative h-64 md:h-80">
            <Image
              src={data.photos[0]}
              alt={data.title || 'Property'}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-lg px-3 py-1">
              <span className="text-sm font-medium text-foreground">
                {data.photos.length} Photos
              </span>
            </div>
            <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-lg">
              <span className="text-sm font-semibold">
                {formatCurrency(data.rent || 0)}/month
              </span>
            </div>
          </div>
        )}

        <div className="p-6">
          {/* Title and Basic Info */}
          <div className="mb-4">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {data.title || 'Property Title'}
            </h2>
            <div className="flex items-center text-muted-foreground mb-2">
              <Icon name="MapPin" size={16} className="mr-1" />
              <span className="text-sm">{data.address || 'Property Address'}</span>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center">
                <Icon name="Home" size={16} className="mr-1 text-primary" />
                <span>{data.bhk || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <Icon name="Maximize" size={16} className="mr-1 text-primary" />
                <span>{data.area || 'N/A'} sq ft</span>
              </div>
              <div className="flex items-center">
                <Icon name="Building" size={16} className="mr-1 text-primary" />
                <span className="capitalize">{data.propertyType || 'N/A'}</span>
              </div>
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-semibold text-foreground">{formatCurrency(data.rent || 0)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Security Deposit</p>
                <p className="font-semibold text-foreground">{formatCurrency(data.securityDeposit || 0)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maintenance</p>
                <p className="font-semibold text-foreground">{formatCurrency(data.maintenanceCharges || 0)}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Monthly</p>
                <p className="font-bold text-primary">{formatCurrency(totalMonthly)}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          {data.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-2">Description</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {data.description}
              </p>
            </div>
          )}

          {/* Amenities */}
          {data.amenities && data.amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center">
                    <Icon 
                      name={amenityIcons[amenity] || 'Check'} 
                      size={16} 
                      className="mr-2 text-primary" 
                    />
                    <span className="text-sm text-foreground">
                      {amenityLabels[amenity] || amenity}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Special Features */}
          {data.specialFeatures && data.specialFeatures.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-foreground mb-3">Special Features</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {data.specialFeatures.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <Icon 
                      name={featureIcons[feature] || 'Star'} 
                      size={16} 
                      className="mr-2 text-primary" 
                    />
                    <span className="text-sm text-foreground">
                      {featureLabels[feature] || feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Details */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm border-t border-border pt-4">
            {data.floor && (
              <div>
                <p className="text-muted-foreground">Floor</p>
                <p className="font-medium text-foreground">{data.floor}</p>
              </div>
            )}
            {data.totalFloors && (
              <div>
                <p className="text-muted-foreground">Total Floors</p>
                <p className="font-medium text-foreground">{data.totalFloors}</p>
              </div>
            )}
            {data.propertyAge && (
              <div>
                <p className="text-muted-foreground">Property Age</p>
                <p className="font-medium text-foreground">{data.propertyAge} years</p>
              </div>
            )}
            {data.availableFrom && (
              <div>
                <p className="text-muted-foreground">Available From</p>
                <p className="font-medium text-foreground">
                  {new Date(data.availableFrom).toLocaleDateString('en-IN')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Sections */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Need to make changes?
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(1)}
            iconName="Edit"
            iconPosition="left"
          >
            Edit Basic Info
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(2)}
            iconName="Camera"
            iconPosition="left"
          >
            Edit Photos
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(3)}
            iconName="FileText"
            iconPosition="left"
          >
            Edit Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(4)}
            iconName="DollarSign"
            iconPosition="left"
          >
            Edit Pricing
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PreviewStep;