import React, { useState, useEffect, useRef } from 'react';
import { Send, User } from 'lucide-react';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { useChat } from '../../../contexts/ChatContext';
import * as chatService from '../../../services/chatService';
import { format } from 'date-fns';
import TypingIndicator from '../../../components/ui/typing-indicator';

const ConversationView = ({ selectedUserId, selectedUserName }) => {
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const { currentUser, selectedConversation, messages, sendMessage, userProfiles, typingUsers, setTypingStatus } = useChat();
  const [chatId, setChatId] = useState(null);

  // Get messages from context for the selected conversation
  const currentMessages = selectedConversation?.chatId ? (messages[selectedConversation.chatId] || []) : [];
  

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  };

  useEffect(() => {
    // Small delay to ensure DOM is updated
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [currentMessages]);

  // Scroll to bottom after sending message
  useEffect(() => {
    if (!loading) {
      scrollToBottom();
    }
  }, [loading]);

  // Update chat ID when user is selected
  useEffect(() => {
    if (selectedUserId && currentUser?.id) {
      const newChatId = chatService.makeChatId(String(currentUser.id), String(selectedUserId));
      setChatId(newChatId);
      
      // Note: Message read functionality can be implemented later if needed
    }
  }, [selectedUserId, currentUser?.id, selectedConversation]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    const tempMessage = messageText.trim();
    setMessageText('');
    setLoading(true);

    try {
      // Use the sendMessage from ChatContext which handles the conversation creation and message sending
      // Pass selectedUserId for new conversations
      await sendMessage(tempMessage, selectedUserId);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessageText(tempMessage); // Restore message on error
    } finally {
      setLoading(false);
    }
  };

  // Typing indicator management
  const typingTimeoutRef = useRef(null);
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageText(value);
    
    // Set typing status to true when user starts typing
    if (value.trim() && !typingTimeoutRef.current) {
      setTypingStatus(true);
    }
    
    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set timeout to stop typing indicator after 2 seconds of inactivity
    typingTimeoutRef.current = setTimeout(() => {
      setTypingStatus(false);
      typingTimeoutRef.current = null;
    }, 2000);
  };
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      // Stop typing indicator when sending message
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = null;
      }
      setTypingStatus(false);
      handleSendMessage();
    }
  };
  
  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
        setTypingStatus(false);
      }
    };
  }, []);

  if (!selectedUserId) {
    return (
      <div className="flex flex-col h-full items-center justify-center text-muted-foreground">
        <User className="h-16 w-16 mb-4" />
        <p className="text-lg font-medium">Select a user to start chatting</p>
        <p className="text-sm mt-2">Choose from existing conversations or start a new chat</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-border bg-background/95">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-primary font-semibold">
              {selectedUserName?.charAt(0)?.toUpperCase() || 'U'}
            </span>
          </div>
          <div>
            <p className="font-medium text-foreground">{selectedUserName || 'User'}</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollBehavior: 'smooth' }}>
        {currentMessages.length === 0 ? (
          <div className="text-center text-muted-foreground py-8">
            <p>No messages yet. Start the conversation!</p>
          </div>
        ) : (
          currentMessages.map((message) => {
            const isOwn = message.isCurrentUser;
            const messageTime = message.timestamp ? 
              format(message.timestamp, 'HH:mm') : 
              format(new Date(), 'HH:mm');

            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-lg px-4 py-2 ${
                    isOwn
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted'
                  }`}
                >
                  {!isOwn && (
                    <p className="text-xs font-medium mb-1 text-muted-foreground">
                      {selectedUserName || userProfiles[String(message.senderId)]?.name || `User ${message.senderId?.slice(0, 6)}`}
                    </p>
                  )}
                  <p className="break-words">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'
                  }`}>
                    {messageTime}
                  </p>
                </div>
              </div>
            );
          })
        )}
        
        {/* Typing Indicator */}
        {Object.keys(typingUsers).length > 0 && (
          <div className="flex justify-start">
            <div className="max-w-[70%]">
              {Object.entries(typingUsers).map(([userId, data]) => {
                // Don't show typing indicator for current user
                if (userId === String(currentUser?.id)) return null;
                
                const userName = userProfiles[String(userId)]?.name || selectedUserName || `User ${userId?.slice(0, 6)}`;
                return (
                  <TypingIndicator 
                    key={userId}
                    userName={userName}
                    className="mb-2"
                  />
                );
              })}
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-border bg-background/95">
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            disabled={loading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!messageText.trim() || loading}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;
