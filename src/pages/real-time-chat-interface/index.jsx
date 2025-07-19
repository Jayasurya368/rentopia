import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ConversationList from './components/ConversationList';
import ChatHeader from './components/ChatHeader';
import PropertyContextCard from './components/PropertyContextCard';
import MessageBubble from './components/MessageBubble';
import MessageComposer from './components/MessageComposer';
import TypingIndicator from './components/TypingIndicator';

const RealTimeChatInterface = () => {
  const [searchParams] = useSearchParams();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [showConversationList, setShowConversationList] = useState(true);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [typingUser, setTypingUser] = useState(null);
  const messagesEndRef = useRef(null);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      participant: {
        name: "Rajesh Kumar",
        isOnline: true,
        lastSeen: new Date(Date.now() - 300000),
        role: "owner"
      },
      property: {
        id: 1,
        title: "Spacious 2BHK Apartment in Bandra West",
        location: "Bandra West, Mumbai",
        type: "2 BHK",
        rent: 45000,
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"]
      },
      lastMessage: {
        content: "Yes, the property is still available. Would you like to schedule a visit?",
        timestamp: new Date(Date.now() - 900000),
        sender: "owner"
      },
      unreadCount: 2
    },
    {
      id: 2,
      participant: {
        name: "Priya Sharma",
        isOnline: false,
        lastSeen: new Date(Date.now() - 3600000),
        role: "seeker"
      },
      property: {
        id: 2,
        title: "Modern 1BHK Studio in Koramangala",
        location: "Koramangala, Bangalore",
        type: "1 BHK",
        rent: 28000,
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400"]
      },
      lastMessage: {
        content: "Thank you for the quick response! I\'ll visit tomorrow at 3 PM.",
        timestamp: new Date(Date.now() - 7200000),
        sender: "seeker"
      },
      unreadCount: 0
    },
    {
      id: 3,
      participant: {
        name: "Amit Patel",
        isOnline: true,
        lastSeen: new Date(),
        role: "owner"
      },
      property: {
        id: 3,
        title: "Luxury 3BHK Penthouse in Gurgaon",
        location: "Sector 54, Gurgaon",
        type: "3 BHK",
        rent: 75000,
        images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400"]
      },
      lastMessage: {
        content: "The maintenance includes gym, pool, and 24/7 security.",
        timestamp: new Date(Date.now() - 1800000),
        sender: "owner"
      },
      unreadCount: 1
    }
  ];

  // Mock messages for selected conversation
  const mockMessages = [
    {
      id: 1,
      type: 'text',
      content: "Hi! I\'m interested in your property listing. Is it still available?",
      timestamp: new Date(Date.now() - 3600000),
      sender: 'seeker',
      status: 'read'
    },
    {
      id: 2,
      type: 'text',
      content: "Hello! Yes, the property is still available. Would you like to know more details?",
      timestamp: new Date(Date.now() - 3300000),
      sender: 'owner',
      status: 'read'
    },
    {
      id: 3,
      type: 'text',
      content: "That\'s great! Can you tell me about the amenities and what\'s included in the rent?",
      timestamp: new Date(Date.now() - 3000000),
      sender: 'seeker',
      status: 'read'
    },
    {
      id: 4,
      type: 'text',
      content: `The rent includes:\n• Water and electricity (up to ₹2000/month)\n• Maintenance charges\n• Parking space\n• 24/7 security\n\nAmenities:\n• Gym and swimming pool\n• Children's play area\n• Power backup\n• Lift access`,
      timestamp: new Date(Date.now() - 2700000),
      sender: 'owner',status: 'read'
    },
    {
      id: 5,
      type: 'property_share',
      property: {
        title: "Spacious 2BHK Apartment in Bandra West",
        location: "Bandra West, Mumbai",
        rent: 45000,
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400"
      },
      timestamp: new Date(Date.now() - 2400000),
      sender: 'owner',status: 'read'
    },
    {
      id: 6,
      type: 'text',content: "Perfect! When can I schedule a visit to see the property?",timestamp: new Date(Date.now() - 2100000),sender: 'seeker',status: 'read'
    },
    {
      id: 7,
      type: 'text',content: "I\'m available this weekend. How about Saturday at 2 PM or Sunday at 11 AM?",timestamp: new Date(Date.now() - 1800000),sender: 'owner',status: 'read'
    },
    {
      id: 8,
      type: 'text',
      content: "Saturday at 2 PM works perfectly for me. Should I bring any documents?",
      timestamp: new Date(Date.now() - 1500000),
      sender: 'seeker',status: 'read'
    },
    {
      id: 9,
      type: 'text',
      content: "Yes, please bring:\n• ID proof (Aadhar/Passport)\n• Income proof (salary slips/bank statements)\n• Previous rental agreement (if any)\n\nI'll share the exact address and my contact number.",
      timestamp: new Date(Date.now() - 1200000),
      sender: 'owner',
      status: 'delivered'
    },
    {
      id: 10,
      type: 'text',
      content: "Thank you so much! Looking forward to seeing the property.",
      timestamp: new Date(Date.now() - 900000),
      sender: 'seeker',
      status: 'sent'
    }
  ];

  useEffect(() => {
    // Check if conversation ID is provided in URL
    const conversationId = searchParams.get('conversation');
    if (conversationId) {
      const conversation = conversations.find(c => c.id === parseInt(conversationId));
      if (conversation) {
        setSelectedConversation(conversation);
        setShowConversationList(false);
      }
    }
  }, [searchParams]);

  useEffect(() => {
    // Load messages for selected conversation
    if (selectedConversation) {
      setMessages(mockMessages);
    }
  }, [selectedConversation]);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Simulate typing indicator
    if (isTyping && selectedConversation) {
      setTypingUser(selectedConversation.participant);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setTypingUser(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isTyping, selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectConversation = (conversation) => {
    setSelectedConversation(conversation);
    setShowConversationList(false);
    // Mark messages as read
    const updatedConversations = conversations.map(c =>
      c.id === conversation.id ? { ...c, unreadCount: 0 } : c
    );
  };

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: messages.length + 1,
      ...messageData,
      sender: 'seeker', // Current user role
      status: 'sent'
    };

    setMessages(prev => [...prev, newMessage]);

    // Simulate message delivery and read status
    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
      ));
    }, 1000);

    setTimeout(() => {
      setMessages(prev => prev.map(msg =>
        msg.id === newMessage.id ? { ...msg, status: 'read' } : msg
      ));
    }, 2000);

    // Simulate owner response
    if (Math.random() > 0.7) {
      setTimeout(() => {
        const responses = [
          "Thank you for your message. I\'ll get back to you shortly.",
          "That sounds good. Let me check and confirm.",
          "Sure, I can arrange that for you.",
          "I\'ll send you the details shortly."
        ];
        
        const ownerResponse = {
          id: messages.length + 2,
          type: 'text',
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date(),
          sender: 'owner',
          status: 'sent'
        };
        
        setMessages(prev => [...prev, ownerResponse]);
      }, 3000);
    }
  };

  const handleTyping = (typing) => {
    setIsTyping(typing);
  };

  const handleBackToList = () => {
    setSelectedConversation(null);
    setShowConversationList(true);
  };

  const toggleConversationList = () => {
    setShowConversationList(!showConversationList);
  };

  const groupMessagesByDate = (messages) => {
    const groups = {};
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    return groups;
  };

  const formatDateHeader = (dateString) => {
    const date = new Date(dateString);
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    if (dateString === today) return 'Today';
    if (dateString === yesterday) return 'Yesterday';
    return date.toLocaleDateString('en-IN', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const messageGroups = groupMessagesByDate(messages);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="h-[calc(100vh-4rem)] flex">
        {/* Conversation List - Desktop Sidebar / Mobile Overlay */}
        <div className={`
          ${showConversationList ? 'block' : 'hidden'} 
          md:block w-full md:w-80 lg:w-96 flex-shrink-0
          ${!showConversationList ? 'md:hidden' : ''}
          ${selectedConversation && !showConversationList ? 'absolute inset-0 z-10 md:relative md:z-auto' : ''}
        `}>
          <ConversationList
            conversations={conversations}
            selectedConversation={selectedConversation}
            onSelectConversation={handleSelectConversation}
            onClose={() => setShowConversationList(false)}
          />
        </div>

        {/* Chat Area */}
        <div className={`
          flex-1 flex flex-col
          ${showConversationList && !selectedConversation ? 'hidden md:flex' : 'flex'}
        `}>
          {/* Chat Header */}
          <ChatHeader
            conversation={selectedConversation}
            onBack={selectedConversation ? handleBackToList : null}
            onToggleConversationList={toggleConversationList}
          />

          {selectedConversation ? (
            <>
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Property Context Card */}
                <PropertyContextCard property={selectedConversation.property} />

                {/* Messages */}
                {Object.entries(messageGroups).map(([date, dateMessages]) => (
                  <div key={date}>
                    {/* Date Header */}
                    <div className="flex justify-center mb-4">
                      <span className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">
                        {formatDateHeader(date)}
                      </span>
                    </div>

                    {/* Messages for this date */}
                    {dateMessages.map((message, index) => {
                      const isOwn = message.sender === 'seeker';
                      const showAvatar = index === 0 || dateMessages[index - 1].sender !== message.sender;
                      
                      return (
                        <MessageBubble
                          key={message.id}
                          message={message}
                          isOwn={isOwn}
                          showAvatar={showAvatar}
                          participant={selectedConversation.participant}
                        />
                      );
                    })}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && typingUser && (
                  <TypingIndicator participant={typingUser} />
                )}

                {/* Scroll anchor */}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Composer */}
              <MessageComposer
                onSendMessage={handleSendMessage}
                onTyping={handleTyping}
              />
            </>
          ) : (
            /* No Conversation Selected */
            <div className="flex-1 flex items-center justify-center bg-muted/20">
              <div className="text-center max-w-md mx-auto p-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to Rentopia Chat
                </h3>
                <p className="text-muted-foreground mb-6">
                  Select a conversation to start messaging with property owners or seekers. 
                  Connect directly and find your perfect rental match.
                </p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-success rounded-full"></div>
                    <span>Real-time messaging</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span>Property context integration</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <span>Secure communication</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RealTimeChatInterface;