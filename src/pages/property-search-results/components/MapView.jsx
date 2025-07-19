import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapView = ({ properties, onPropertySelect, className = '' }) => {
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Mock coordinates for demonstration
  const mapCenter = { lat: 19.0760, lng: 72.8777 }; // Mumbai coordinates

  const handlePropertyClick = (property) => {
    setSelectedProperty(property);
    onPropertySelect(property);
  };

  const handleClosePopup = () => {
    setSelectedProperty(null);
  };

  return (
    <div className={`relative w-full h-full bg-muted rounded-lg overflow-hidden ${className}`}>
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="Property Locations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter.lat},${mapCenter.lng}&z=12&output=embed`}
          className="border-0"
        />
      </div>

      {/* Property Markers Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {properties.slice(0, 10).map((property, index) => (
          <div
            key={property.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${20 + (index % 5) * 15}%`,
              top: `${20 + Math.floor(index / 5) * 20}%`,
            }}
          >
            <button
              onClick={() => handlePropertyClick(property)}
              className="relative bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium shadow-modal hover:bg-primary/90 transition-smooth"
            >
              ₹{(property.rent / 1000).toFixed(0)}K
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-primary"></div>
            </button>
          </div>
        ))}
      </div>

      {/* Property Popup */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-card border border-border rounded-lg shadow-modal p-4 max-w-sm mx-auto">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-sm line-clamp-1">
                {selectedProperty.title}
              </h3>
              <div className="flex items-center space-x-1 text-muted-foreground mt-1">
                <Icon name="MapPin" size={12} />
                <span className="text-xs line-clamp-1">{selectedProperty.location}</span>
              </div>
            </div>
            <button
              onClick={handleClosePopup}
              className="p-1 hover:bg-muted rounded transition-smooth"
            >
              <Icon name="X" size={16} />
            </button>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div className="text-lg font-bold text-primary">
              ₹{selectedProperty.rent.toLocaleString('en-IN')}/month
            </div>
            <div className="text-xs text-muted-foreground">
              {selectedProperty.bedrooms} BHK • {selectedProperty.area} sq ft
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open(`/property-details?id=${selectedProperty.id}`, '_blank')}
              className="flex-1"
            >
              View Details
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="MessageCircle"
              iconSize={14}
              className="flex-1"
            >
              Contact
            </Button>
          </div>
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button className="p-2 bg-card border border-border rounded-md shadow-card hover:bg-muted transition-smooth">
          <Icon name="Plus" size={16} />
        </button>
        <button className="p-2 bg-card border border-border rounded-md shadow-card hover:bg-muted transition-smooth">
          <Icon name="Minus" size={16} />
        </button>
        <button className="p-2 bg-card border border-border rounded-md shadow-card hover:bg-muted transition-smooth">
          <Icon name="Locate" size={16} />
        </button>
      </div>
    </div>
  );
};

export default MapView;