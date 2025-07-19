import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentInquiries = () => {
  const navigate = useNavigate();

  const inquiries = [
    {
      id: 1,
      seekerName: "Priya Sharma",
      seekerAvatar: "https://randomuser.me/api/portraits/women/32.jpg",
      propertyTitle: "Modern 3BHK Apartment in Bandra",
      message: "Hi, I'm interested in viewing this property. Is it available for immediate possession?",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unread: true,
      propertyId: 1
    },
    {
      id: 2,
      seekerName: "Rahul Gupta",
      seekerAvatar: "https://randomuser.me/api/portraits/men/45.jpg",
      propertyTitle: "Luxury 2BHK with Sea View",
      message: "Can we schedule a visit this weekend? Also, is parking included in the rent?",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unread: true,
      propertyId: 2
    },
    {
      id: 3,
      seekerName: "Anita Patel",
      seekerAvatar: "https://randomuser.me/api/portraits/women/28.jpg",
      propertyTitle: "Premium 3BHK Penthouse",
      message: "The property looks amazing! What are the maintenance charges and security deposit?",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unread: false,
      propertyId: 5
    },
    {
      id: 4,
      seekerName: "Vikram Singh",
      seekerAvatar: "https://randomuser.me/api/portraits/men/38.jpg",
      propertyTitle: "Spacious 4BHK Villa",
      message: "Is the property pet-friendly? I have a small dog.",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      unread: false,
      propertyId: 3
    },
    {
      id: 5,
      seekerName: "Meera Reddy",
      seekerAvatar: "https://randomuser.me/api/portraits/women/42.jpg",
      propertyTitle: "Modern 3BHK Apartment in Bandra",
      message: "Thank you for the quick response! Looking forward to the visit tomorrow.",
      timestamp: new Date(Date.now() - 14400000), // 4 hours ago
      unread: false,
      propertyId: 1
    }
  ];

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) {
      return `${minutes}m ago`;
    } else if (hours < 24) {
      return `${hours}h ago`;
    } else {
      return `${days}d ago`;
    }
  };

  const handleReply = (inquiryId, seekerName) => {
    navigate(`/real-time-chat-interface?user=${encodeURIComponent(seekerName)}&inquiry=${inquiryId}`);
  };

  const handleViewProperty = (propertyId) => {
    navigate(`/property-details?id=${propertyId}`);
  };

  const unreadCount = inquiries.filter(inquiry => inquiry.unread).length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-card">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-semibold text-foreground">Recent Inquiries</h2>
            {unreadCount > 0 && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full font-medium">
                {unreadCount} new
              </span>
            )}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/real-time-chat-interface')}
            iconName="MessageCircle"
            iconPosition="left"
          >
            View All
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {inquiries.map((inquiry) => (
          <div
            key={inquiry.id}
            className={`p-4 hover:bg-muted/30 transition-smooth ${
              inquiry.unread ? 'bg-primary/5' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="relative">
                <img
                  src={inquiry.seekerAvatar}
                  alt={inquiry.seekerName}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {inquiry.unread && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-background"></div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-medium text-foreground truncate">
                    {inquiry.seekerName}
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {formatTimestamp(inquiry.timestamp)}
                  </span>
                </div>
                
                <button
                  onClick={() => handleViewProperty(inquiry.propertyId)}
                  className="text-xs text-primary hover:text-primary/80 transition-smooth mb-2 block"
                >
                  {inquiry.propertyTitle}
                </button>
                
                <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                  {inquiry.message}
                </p>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleReply(inquiry.id, inquiry.seekerName)}
                    iconName="Reply"
                    iconPosition="left"
                  >
                    Reply
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    onClick={() => handleViewProperty(inquiry.propertyId)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    View Property
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {inquiries.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="MessageCircle" size={48} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Inquiries Yet</h3>
          <p className="text-muted-foreground mb-4">
            When seekers show interest in your properties, their messages will appear here.
          </p>
          <Button
            variant="outline"
            onClick={() => navigate('/property-listing-creation')}
            iconName="Plus"
            iconPosition="left"
          >
            Add More Properties
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentInquiries;