import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const PropertyContextCard = ({ property }) => {
  if (!property) return null;

  return (
    <div className="bg-muted/50 border border-border rounded-lg p-4 mb-4">
      <div className="flex items-start space-x-4">
        {/* Property Image */}
        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={property.images[0]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Property Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-foreground mb-1 truncate">
            {property.title}
          </h3>
          
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span className="truncate">{property.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Home" size={14} />
              <span>{property.type}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold text-primary">
              ₹{property.rent.toLocaleString('en-IN')}/month
            </div>
            <Link to={`/property-details?id=${property.id}`}>
              <Button variant="outline" size="sm" iconName="ExternalLink" iconSize={14}>
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyContextCard;