import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const StickyActionBar = ({ property, owner }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    // Here you would typically save to localStorage or send to API
    const bookmarks = JSON.parse(localStorage.getItem('bookmarkedProperties') || '[]');
    if (isBookmarked) {
      const updatedBookmarks = bookmarks.filter(id => id !== property.id);
      localStorage.setItem('bookmarkedProperties', JSON.stringify(updatedBookmarks));
    } else {
      bookmarks.push(property.id);
      localStorage.setItem('bookmarkedProperties', JSON.stringify(bookmarks));
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: property.title,
      text: `Check out this ${property.bedrooms} BHK ${property.type} for rent at ₹${property.rent.toLocaleString('en-IN')}/month`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare();
      }
    } else {
      fallbackShare();
    }
  };

  const fallbackShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // You could show a toast notification here
    alert('Link copied to clipboard!');
  };

  const handleChatWithOwner = () => {
    navigate('/real-time-chat-interface', {
      state: {
        recipientId: owner.id,
        recipientName: owner.name,
        propertyId: property.id,
      }
    });
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border shadow-modal z-40 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          {/* Price Info */}
          <div className="hidden md:block">
            <div className="text-2xl font-bold text-primary">
              {formatPrice(property.rent)}
            </div>
            <div className="text-sm text-muted-foreground">per month</div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3 flex-1 md:flex-none">
            {/* Bookmark Button */}
            <button
              onClick={handleBookmark}
              className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-smooth ${
                isBookmarked
                  ? 'border-primary bg-primary text-white' :'border-border bg-card text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              <Icon name={isBookmarked ? "Heart" : "Heart"} size={20} className={isBookmarked ? "fill-current" : ""} />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="w-12 h-12 rounded-full border-2 border-border bg-card text-muted-foreground hover:border-primary hover:text-primary flex items-center justify-center transition-smooth"
            >
              <Icon name="Share" size={20} />
            </button>

            {/* Chat Button */}
            <Button
              variant="default"
              size="lg"
              iconName="MessageCircle"
              iconPosition="left"
              onClick={handleChatWithOwner}
              className="flex-1 md:flex-none"
            >
              <span className="hidden sm:inline">Chat with Owner</span>
              <span className="sm:hidden">Chat</span>
            </Button>
          </div>
        </div>

        {/* Mobile Price Info */}
        <div className="md:hidden mt-3 pt-3 border-t border-border flex items-center justify-between">
          <div>
            <div className="text-xl font-bold text-primary">
              {formatPrice(property.rent)}
            </div>
            <div className="text-xs text-muted-foreground">per month</div>
          </div>
          <div className="text-sm text-muted-foreground">
            {property.bedrooms} BHK • {property.area} sq ft
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyActionBar;