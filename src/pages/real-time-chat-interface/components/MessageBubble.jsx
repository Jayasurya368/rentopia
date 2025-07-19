import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const MessageBubble = ({ message, isOwn, showAvatar = false, participant }) => {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'sent':
        return <Icon name="Check" size={12} className="text-muted-foreground" />;
      case 'delivered':
        return <Icon name="CheckCheck" size={12} className="text-muted-foreground" />;
      case 'read':
        return <Icon name="CheckCheck" size={12} className="text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className={`flex items-end space-x-2 mb-4 ${isOwn ? 'flex-row-reverse space-x-reverse' : ''}`}>
      {/* Avatar */}
      {showAvatar && !isOwn && (
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
          <Icon name="User" size={16} color="white" />
        </div>
      )}
      {showAvatar && isOwn && <div className="w-8"></div>}

      {/* Message Content */}
      <div className={`max-w-xs lg:max-w-md ${isOwn ? 'ml-auto' : 'mr-auto'}`}>
        {/* Message Bubble */}
        <div
          className={`px-4 py-2 rounded-2xl ${
            isOwn
              ? 'bg-primary text-primary-foreground rounded-br-md'
              : 'bg-muted text-foreground rounded-bl-md'
          }`}
        >
          {message.type === 'text' && (
            <p className="text-sm whitespace-pre-wrap break-words">
              {message.content}
            </p>
          )}

          {message.type === 'image' && (
            <div className="space-y-2">
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={message.imageUrl}
                  alt="Shared image"
                  className="w-full h-auto max-h-64 object-cover cursor-pointer hover:opacity-90 transition-smooth"
                />
              </div>
              {message.content && (
                <p className="text-sm whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              )}
            </div>
          )}

          {message.type === 'property_share' && (
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-xs opacity-80">
                <Icon name="Home" size={12} />
                <span>Property Shared</span>
              </div>
              <div className="bg-black/10 rounded-lg p-3">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                    <Image
                      src={message.property.image}
                      alt={message.property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">
                      {message.property.title}
                    </h4>
                    <p className="text-xs opacity-80 truncate">
                      {message.property.location}
                    </p>
                    <p className="text-sm font-semibold mt-1">
                      ₹{message.property.rent.toLocaleString('en-IN')}/month
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Info */}
        <div className={`flex items-center space-x-1 mt-1 px-1 ${isOwn ? 'justify-end' : 'justify-start'}`}>
          <span className="text-xs text-muted-foreground">
            {formatTime(message.timestamp)}
          </span>
          {isOwn && getStatusIcon(message.status)}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;