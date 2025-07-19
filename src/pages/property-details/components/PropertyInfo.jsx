import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyInfo = ({ property }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Price and Basic Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">{property.title}</h1>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span className="text-sm">{property.address}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{formatPrice(property.rent)}</div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-2">
            <Icon name="Home" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{property.type}</div>
              <div className="text-xs text-muted-foreground">Property Type</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Bed" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{property.bedrooms} BHK</div>
              <div className="text-xs text-muted-foreground">Bedrooms</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Maximize" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{property.area} sq ft</div>
              <div className="text-xs text-muted-foreground">Area</div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <div>
              <div className="text-sm font-medium">{formatDate(property.availableFrom)}</div>
              <div className="text-xs text-muted-foreground">Available From</div>
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Description</h2>
        <p className="text-muted-foreground leading-relaxed">{property.description}</p>
      </div>

      {/* Additional Details */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Property Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Furnishing</span>
            <span className="font-medium">{property.furnishing}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Floor</span>
            <span className="font-medium">{property.floor}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Facing</span>
            <span className="font-medium">{property.facing}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Age of Property</span>
            <span className="font-medium">{property.age} years</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Deposit</span>
            <span className="font-medium">{formatPrice(property.deposit)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Maintenance</span>
            <span className="font-medium">{formatPrice(property.maintenance)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyInfo;