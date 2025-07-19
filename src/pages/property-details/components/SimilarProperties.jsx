import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const SimilarProperties = ({ properties, currentPropertyId }) => {
  const navigate = useNavigate();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const handlePropertyClick = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
    window.scrollTo(0, 0);
  };

  // Filter out current property
  const filteredProperties = properties.filter(property => property.id !== currentPropertyId);

  if (!filteredProperties || filteredProperties.length === 0) {
    return null;
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Similar Properties</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.slice(0, 6).map((property) => (
          <div
            key={property.id}
            onClick={() => handlePropertyClick(property.id)}
            className="bg-muted rounded-lg overflow-hidden hover:shadow-card transition-smooth cursor-pointer group"
          >
            <div className="relative h-32 overflow-hidden">
              <Image
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                {property.images.length} photos
              </div>
            </div>
            
            <div className="p-4">
              <h3 className="font-medium text-foreground mb-1 line-clamp-1">
                {property.title}
              </h3>
              
              <div className="flex items-center space-x-1 text-muted-foreground text-xs mb-2">
                <Icon name="MapPin" size={12} />
                <span className="line-clamp-1">{property.location}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-primary font-semibold">
                  {formatPrice(property.rent)}/mo
                </div>
                <div className="text-xs text-muted-foreground">
                  {property.bedrooms} BHK
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                <span>{property.area} sq ft</span>
                <span>{property.type}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProperties.length > 6 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => navigate('/property-search-results')}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-smooth"
          >
            View More Properties
            <Icon name="ArrowRight" size={16} className="inline ml-1" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SimilarProperties;