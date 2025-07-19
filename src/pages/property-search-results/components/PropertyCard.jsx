import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyCard = ({ property, onBookmark, onContactOwner }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/property-details?id=${property.id}`);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => 
      prev === property.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleBookmark = (e) => {
    e.stopPropagation();
    onBookmark(property.id);
  };

  const handleContact = (e) => {
    e.stopPropagation();
    onContactOwner(property);
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg overflow-hidden shadow-card hover:shadow-modal transition-smooth cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Gallery */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.images[currentImageIndex]}
          alt={property.title}
          className="w-full h-full object-cover"
        />
        
        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className={`absolute top-3 right-3 p-2 rounded-full transition-smooth ${
            property.isBookmarked 
              ? 'bg-error text-error-foreground' 
              : 'bg-background/80 text-foreground hover:bg-background'
          }`}
          aria-label={property.isBookmarked ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Icon name="Heart" size={16} fill={property.isBookmarked ? 'currentColor' : 'none'} />
        </button>

        {/* Image Navigation */}
        {property.images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-background/80 text-foreground rounded-full hover:bg-background transition-smooth"
              aria-label="Previous image"
            >
              <Icon name="ChevronLeft" size={16} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1.5 bg-background/80 text-foreground rounded-full hover:bg-background transition-smooth"
              aria-label="Next image"
            >
              <Icon name="ChevronRight" size={16} />
            </button>
            
            {/* Image Indicators */}
            <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {property.images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-smooth ${
                    index === currentImageIndex ? 'bg-primary' : 'bg-background/60'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Property Type Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded">
          {property.type}
        </div>
      </div>

      {/* Property Details */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-1">
            {property.title}
          </h3>
          <div className="text-right">
            <div className="text-lg font-bold text-primary">
              ₹{property.rent.toLocaleString('en-IN')}/month
            </div>
            {property.deposit && (
              <div className="text-xs text-muted-foreground">
                ₹{property.deposit.toLocaleString('en-IN')} deposit
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-1 text-muted-foreground mb-3">
          <Icon name="MapPin" size={14} />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Property Features */}
        <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Bed" size={14} />
            <span>{property.bedrooms} BHK</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Bath" size={14} />
            <span>{property.bathrooms} Bath</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Square" size={14} />
            <span>{property.area} sq ft</span>
          </div>
        </div>

        {/* Amenities */}
        {property.amenities && property.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {property.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
              >
                {amenity}
              </span>
            ))}
            {property.amenities.length > 3 && (
              <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded">
                +{property.amenities.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Owner Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={14} color="white" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">{property.owner.name}</div>
              <div className="text-xs text-muted-foreground">Owner</div>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleContact}
            iconName="MessageCircle"
            iconSize={14}
          >
            Contact
          </Button>
        </div>

        {/* Availability */}
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Available from:</span>
            <span className="text-foreground font-medium">
              {new Date(property.availableFrom).toLocaleDateString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;