import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChatHeader = ({ conversation, onBack, onToggleConversationList }) => {
  const [showMenu, setShowMenu] = useState(false);

  if (!conversation) {
    return (
      <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleConversationList}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          >
            <Icon name="Menu" size={20} />
          </button>
          <h1 className="text-lg font-semibold text-foreground">Messages</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-4">
      <div className="flex items-center space-x-3">
        {/* Back/Menu Button */}
        <button
          onClick={onBack || onToggleConversationList}
          className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
        >
          <Icon name={onBack ? "ArrowLeft" : "Menu"} size={20} />
        </button>

        {/* Participant Info */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Icon name="User" size={20} color="white" />
          </div>
          <div>
            <h2 className="font-medium text-foreground">
              {conversation.participant.name}
            </h2>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {conversation.participant.isOnline ? (
                <>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Online</span>
                </>
              ) : (
                <span>
                  Last seen {new Date(conversation.participant.lastSeen).toLocaleDateString('en-IN')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {/* Property Link */}
        <Link to={`/property-details?id=${conversation.property.id}`}>
          <Button
            variant="ghost"
            size="sm"
            iconName="Home"
            iconSize={16}
            className="hidden sm:flex"
          >
            View Property
          </Button>
        </Link>

        {/* Video Call */}
        <Button
          variant="ghost"
          size="icon"
          iconName="Video"
          iconSize={18}
          className="hidden sm:flex"
        />

        {/* Phone Call */}
        <Button
          variant="ghost"
          size="icon"
          iconName="Phone"
          iconSize={18}
          className="hidden sm:flex"
        />

        {/* Menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            iconName="MoreVertical"
            iconSize={18}
            onClick={() => setShowMenu(!showMenu)}
          />

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-modal z-50">
              <div className="py-1">
                <Link
                  to={`/property-details?id=${conversation.property.id}`}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth sm:hidden"
                  onClick={() => setShowMenu(false)}
                >
                  <Icon name="Home" size={16} />
                  <span>View Property</span>
                </Link>
                
                <button
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  onClick={() => setShowMenu(false)}
                >
                  <Icon name="Search" size={16} />
                  <span>Search Messages</span>
                </button>
                
                <button
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth"
                  onClick={() => setShowMenu(false)}
                >
                  <Icon name="Bell" size={16} />
                  <span>Mute Notifications</span>
                </button>
                
                <div className="border-t border-border my-1"></div>
                
                <button
                  className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth"
                  onClick={() => setShowMenu(false)}
                >
                  <Icon name="Trash2" size={16} />
                  <span>Delete Conversation</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;