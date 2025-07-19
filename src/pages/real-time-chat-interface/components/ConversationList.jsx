import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations, selectedConversation, onSelectConversation, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLastMessageTime = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      return 'now';
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h`;
    } else {
      return messageTime.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="h-full flex flex-col bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Messages</h2>
          <button
            onClick={onClose}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon
            name="Search"
            size={16}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-md text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length === 0 ? (
          <div className="p-8 text-center">
            <Icon name="MessageCircle" size={48} className="mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No conversations found</p>
          </div>
        ) : (
          filteredConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation)}
              className={`w-full p-4 border-b border-border hover:bg-muted transition-smooth text-left ${
                selectedConversation?.id === conversation.id ? 'bg-primary/10' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                {/* Property Thumbnail */}
                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={conversation.property.images[0]}
                    alt={conversation.property.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  {/* Participant Info */}
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium text-foreground truncate">
                        {conversation.participant.name}
                      </h3>
                      {conversation.participant.isOnline && (
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatLastMessageTime(conversation.lastMessage.timestamp)}
                    </span>
                  </div>

                  {/* Property Title */}
                  <p className="text-xs text-muted-foreground mb-1 truncate">
                    {conversation.property.title}
                  </p>

                  {/* Last Message */}
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground truncate flex-1">
                      {conversation.lastMessage.content}
                    </p>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                        {conversation.unreadCount > 9 ? '9+' : conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
};

export default ConversationList;