import React from 'react';

const TypingIndicator = ({ participant }) => {
  if (!participant) return null;

  return (
    <div className="flex items-end space-x-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
        <span className="text-xs text-primary-foreground font-medium">
          {participant.name.charAt(0).toUpperCase()}
        </span>
      </div>
      
      <div className="bg-muted text-foreground px-4 py-2 rounded-2xl rounded-bl-md">
        <div className="flex items-center space-x-1">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-xs text-muted-foreground ml-2">typing...</span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;