import React from 'react';
import Icon from '../../../components/AppIcon';

const AmenitiesSection = ({ amenities }) => {
  const amenityIcons = {
    'Parking': 'Car',
    'WiFi': 'Wifi',
    'Security': 'Shield',
    'Gym': 'Dumbbell',
    'Swimming Pool': 'Waves',
    'Garden': 'Trees',
    'Elevator': 'ArrowUp',
    'Power Backup': 'Zap',
    'Water Supply': 'Droplets',
    'Air Conditioning': 'Wind',
    'Balcony': 'Home',
    'Furnished': 'Sofa',
    'Pet Friendly': 'Heart',
    'CCTV': 'Camera',
    'Intercom': 'Phone',
    'Maintenance': 'Wrench',
    'Clubhouse': 'Building',
    'Playground': 'Gamepad2',
    'Laundry': 'Shirt',
    'Kitchen': 'ChefHat',
  };

  const getAmenityIcon = (amenity) => {
    return amenityIcons[amenity] || 'Check';
  };

  if (!amenities || amenities.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-3">Amenities</h2>
        <p className="text-muted-foreground">No amenities listed for this property.</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {amenities.map((amenity, index) => (
          <div
            key={index}
            className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-smooth"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Icon
                name={getAmenityIcon(amenity)}
                size={16}
                className="text-primary"
              />
            </div>
            <span className="text-sm font-medium text-foreground">{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AmenitiesSection;