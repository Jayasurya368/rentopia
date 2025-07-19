import React from 'react';
import Icon from '../../../components/AppIcon';

const PropertyMap = ({ property }) => {
  const { latitude, longitude, address } = property;

  const nearbyPlaces = [
    { name: 'Metro Station', distance: '0.5 km', icon: 'Train' },
    { name: 'Hospital', distance: '1.2 km', icon: 'Cross' },
    { name: 'Shopping Mall', distance: '0.8 km', icon: 'ShoppingBag' },
    { name: 'School', distance: '0.3 km', icon: 'GraduationCap' },
    { name: 'Restaurant', distance: '0.2 km', icon: 'UtensilsCrossed' },
    { name: 'Bank', distance: '0.6 km', icon: 'CreditCard' },
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Location & Nearby</h2>
      
      {/* Address */}
      <div className="flex items-start space-x-3 mb-4 p-3 bg-muted rounded-lg">
        <Icon name="MapPin" size={20} className="text-primary mt-0.5" />
        <div>
          <div className="font-medium text-foreground">{address}</div>
          <div className="text-sm text-muted-foreground mt-1">
            Coordinates: {latitude}, {longitude}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-64 bg-muted rounded-lg overflow-hidden mb-4">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={property.title}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${latitude},${longitude}&z=14&output=embed`}
          className="border-0"
        />
      </div>

      {/* Nearby Places */}
      <div>
        <h3 className="font-medium text-foreground mb-3">Nearby Places</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {nearbyPlaces.map((place, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <Icon name={place.icon} size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-foreground">{place.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{place.distance}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;