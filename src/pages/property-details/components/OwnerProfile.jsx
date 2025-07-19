import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const OwnerProfile = ({ owner, propertyId }) => {
  const navigate = useNavigate();

  const handleContactOwner = () => {
    // Navigate to chat interface with owner details
    navigate('/real-time-chat-interface', {
      state: {
        recipientId: owner.id,
        recipientName: owner.name,
        propertyId: propertyId,
      }
    });
  };

  const handleCallOwner = () => {
    window.open(`tel:${owner.phone}`, '_self');
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-500 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={16} className="text-yellow-500 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-lg font-semibold text-foreground mb-4">Property Owner</h2>
      
      <div className="flex items-start space-x-4 mb-6">
        <div className="relative">
          <Image
            src={owner.avatar}
            alt={owner.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          {owner.verified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-card">
              <Icon name="Check" size={12} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h3 className="font-semibold text-foreground">{owner.name}</h3>
            {owner.verified && (
              <span className="text-xs bg-success/10 text-success px-2 py-1 rounded-full">
                Verified
              </span>
            )}
          </div>
          
          <div className="flex items-center space-x-1 mb-2">
            {getRatingStars(owner.rating)}
            <span className="text-sm text-muted-foreground ml-2">
              {owner.rating} ({owner.reviewCount} reviews)
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Member since {new Date(owner.memberSince).getFullYear()}
          </div>
        </div>
      </div>

      {/* Owner Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{owner.totalProperties}</div>
          <div className="text-xs text-muted-foreground">Properties</div>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <div className="text-lg font-semibold text-foreground">{owner.responseTime}</div>
          <div className="text-xs text-muted-foreground">Response Time</div>
        </div>
      </div>

      {/* Contact Actions */}
      <div className="space-y-3">
        <Button
          variant="default"
          fullWidth
          iconName="MessageCircle"
          iconPosition="left"
          onClick={handleContactOwner}
        >
          Chat with Owner
        </Button>
        
        <Button
          variant="outline"
          fullWidth
          iconName="Phone"
          iconPosition="left"
          onClick={handleCallOwner}
        >
          Call {owner.phone}
        </Button>
      </div>

      {/* Owner Description */}
      {owner.description && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">{owner.description}</p>
        </div>
      )}
    </div>
  );
};

export default OwnerProfile;