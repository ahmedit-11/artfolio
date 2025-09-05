import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as chatService from '../services/chatService';
import { authAPI, userAPI } from '../lib/api';
import Cookies from 'js-cookie';
import { createOrUpdateUserProfile, updateUserOnlineStatus } from '../services/userService';
import { decodeToken, getStoredUser } from '../utils/tokenUtils';
import { useNotifications } from './NotificationContext';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  // Get currentUser from Redux store
  const reduxCurrentUser = useSelector(state => state.currentUser?.currentUser);
  const [currentUser, setCurrentUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(true);
  const [typingUsers, setTypingUsers] = useState({});
  const [userProfiles, setUserProfiles] = useState({});
  const token = Cookies.get('token');
  const { addNotification } = useNotifications();
  const location = useLocation();

  // Track previous unread counts and last message keys per conversation to detect changes
  const prevUnreadCountsRef = useRef({});
  const prevLastMsgKeyRef = useRef({});
  const hasInitializedRef = useRef(false);
  const selectedConvRef = useRef(null);

  useEffect(() => {
    selectedConvRef.current = selectedConversation;
  }, [selectedConversation]);

  // Clear selected conversation when navigating away from chat page
  useEffect(() => {
    if (location.pathname !== '/chat') {
      setSelectedConversation(null);
    }
  }, [location.pathname]);

  const truncateText = (t, n = 60) =>
    typeof t === 'string' && t.length > n ? `${t.slice(0, n - 1)}…` : (t || '');

  // Use Redux currentUser instead of decoding token
  useEffect(() => {
    const initializeUser = async () => {
      if (reduxCurrentUser && token) {
        try {
          const user = {
            id: String(reduxCurrentUser.id),
            name: reduxCurrentUser.name || 'User',
            email: reduxCurrentUser.email || '',
            avatar: reduxCurrentUser.profile_picture || reduxCurrentUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(reduxCurrentUser.name || 'User')}&background=random`,
            isOnline: true
          };
          
          // Store user in localStorage for future use
          localStorage.setItem('user', JSON.stringify(user));
          
          // Sync user to Firebase
          await createOrUpdateUserProfile(user.id, user);
          setCurrentUser(user);
        } catch (error) {
          console.error('Error initializing user:', error);
        }
      }
      setAuthLoading(false);
    };

    initializeUser();
  }, [reduxCurrentUser, token]);

  // Update loading state based on auth
  useEffect(() => {
    if (!authLoading) {
      setLoading(false);
    }
  }, [authLoading]);

  // Listen for user's conversations
  useEffect(() => {
    if (!currentUser?.id || authLoading) return;
    
    const unsubscribe = chatService.listenForUserChats(String(currentUser.id), async (chats) => {
      // Get all unique user IDs from chats
      const userIds = new Set();
      chats.forEach(chat => {
        chat.users.forEach(userId => {
          if (userId !== String(currentUser.id)) {
            userIds.add(userId);
          }
        });
      });

      // Fetch real user profiles from API
      const profiles = {};
      
      // Try to fetch user profiles from API
      try {
        const userProfilePromises = Array.from(userIds).map(async (userId) => {
          try {
            const response = await userAPI.getById(userId);
            const userData = response.data || response;
            return {
              id: String(userId),
              name: userData.name || `User ${userId}`,
              avatar: userData.profile_picture || userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=random`
            };
          } catch (error) {
            console.warn(`Failed to fetch user ${userId}:`, error);
            return {
              id: String(userId),
              name: `User ${userId}`,
              avatar: `https://ui-avatars.com/api/?name=User${userId}&background=random`
            };
          }
        });
        
        const userProfilesArray = await Promise.all(userProfilePromises);
        userProfilesArray.forEach(profile => {
          profiles[String(profile.id)] = profile;
        });
      } catch (error) {
        console.warn('Failed to fetch user profiles, using fallback:', error);
        // Fallback to generic profiles
        userIds.forEach(userId => {
          profiles[String(userId)] = {
            id: String(userId),
            name: `User ${userId}`,
            avatar: `https://ui-avatars.com/api/?name=User${userId}&background=random`
          };
        });
      }
      setUserProfiles(profiles);

      const formattedConversations = chats.map(chat => {
        const otherUserId = chat.users.find(userId => userId !== String(currentUser.id));
        const userProfile = profiles[String(otherUserId)] || {};
        
        // Calculate unread count
        const unreadCount = chat.unreadCount?.[String(currentUser.id)] || 0;
        
        // Robust timestamp handling for lastMessage.createdAt
        let lmTimestamp = null;
        if (chat.lastMessage?.createdAt) {
          const ca = chat.lastMessage.createdAt;
          if (typeof ca?.toDate === 'function') {
            lmTimestamp = ca.toDate();
          } else if (ca instanceof Date) {
            lmTimestamp = ca;
          } else {
            // try to parse primitives/strings
            const parsed = new Date(ca);
            lmTimestamp = isNaN(parsed.getTime()) ? null : parsed;
          }
        }

        return {
          id: chat.id,
          chatId: chat.id,
          user: {
            id: String(otherUserId),
            name: userProfile.name || `User ${otherUserId?.slice(0, 6)}`,
            avatar: userProfile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name || 'User')}&background=7c3aed&color=fff`,
            isOnline: userProfile.isOnline || false
          },
          lastMessage: chat.lastMessage ? {
            text: chat.lastMessage.text,
            timestamp: lmTimestamp,
            senderId: chat.lastMessage.senderId,
            isRead: chat.lastMessage.isRead || false
          } : null,
          unreadCount: unreadCount
        };
      });
      
      // Detect new incoming messages and create notifications (skip initial load)
      if (hasInitializedRef.current) {
        formattedConversations.forEach((conv) => {
          const prev = prevUnreadCountsRef.current[conv.id] ?? 0;
          const increased = (conv.unreadCount || 0) > prev;
          const incoming = conv.lastMessage && String(conv.lastMessage.senderId) !== String(currentUser.id);
          const isOpenConv = location.pathname === '/chat' && selectedConvRef.current?.id === conv.id;
          // Robust: also detect lastMessage change (in case unreadCount isn't available yet)
          const currKey = conv.lastMessage
            ? `${conv.lastMessage.senderId}|${conv.lastMessage.text}|${conv.lastMessage.timestamp ? new Date(conv.lastMessage.timestamp).getTime() : ''}`
            : '';
          const prevKey = prevLastMsgKeyRef.current[conv.id] || '';
          const lastMsgChanged = !!currKey && currKey !== prevKey;

          // Only notify if there's actually a message (not just a new empty conversation)
          if ((increased || lastMsgChanged) && incoming && !isOpenConv && conv.lastMessage?.text) {
            addNotification({
              type: 'message',
              actorName: conv.user?.name || 'User',
              avatar: conv.user?.avatar || '',
              action: 'sent you a new message',
              time: 'now',
              chatId: conv.chatId || conv.id,
              userId: conv.user?.id,
            });
          }
        });
      }
      // Update previous counts snapshot
      const nextCounts = {};
      formattedConversations.forEach((conv) => {
        nextCounts[conv.id] = conv.unreadCount || 0;
      });
      prevUnreadCountsRef.current = nextCounts;
      // Update previous last message keys
      const nextKeys = {};
      formattedConversations.forEach((conv) => {
        nextKeys[conv.id] = conv.lastMessage
          ? `${conv.lastMessage.senderId}|${conv.lastMessage.text}|${conv.lastMessage.timestamp ? new Date(conv.lastMessage.timestamp).getTime() : ''}`
          : '';
      });
      prevLastMsgKeyRef.current = nextKeys;
      hasInitializedRef.current = true;
      
      // Sort conversations by most recent activity (newest first)
      const sortedConversations = formattedConversations.sort((a, b) => {
        const aTime = a.lastMessage?.timestamp || new Date(0);
        const bTime = b.lastMessage?.timestamp || new Date(0);
        return bTime - aTime; // Newest first
      });
      
      setConversations(sortedConversations);
      setLoading(false);
    });

    return unsubscribe;
  }, [currentUser?.id, authLoading]);

  // Listen for messages in selected conversation
  useEffect(() => {
    if (!selectedConversation?.chatId) return;

    const unsubscribe = chatService.listenForMessages(selectedConversation.chatId, (msgs) => {
      const formattedMessages = msgs.map(msg => {
        let ts = null;
        if (msg.createdAt) {
          const ca = msg.createdAt;
          if (typeof ca?.toDate === 'function') {
            ts = ca.toDate();
          } else if (ca instanceof Date) {
            ts = ca;
          } else {
            const parsed = new Date(ca);
            ts = isNaN(parsed.getTime()) ? new Date() : parsed;
          }
        } else {
          ts = new Date();
        }
        return {
          id: msg.id,
          text: msg.text,
          timestamp: ts,
          senderId: msg.senderId,
          isCurrentUser: msg.senderId === String(currentUser?.id),
          isRead: msg.isRead || false
        };
      });

      setMessages(prev => ({
        ...prev,
        [selectedConversation.chatId]: formattedMessages
      }));
    });

    return unsubscribe;
  }, [selectedConversation?.chatId, currentUser?.id]);

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (!selectedConversation?.chatId || !currentUser?.id) return;
    
    const markAsRead = async () => {
      await chatService.markMessagesAsRead(selectedConversation.chatId, String(currentUser.id));
    };
    
    markAsRead();
  }, [selectedConversation?.chatId, currentUser?.id]);

  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    
    // Mark as read (implement unread logic) - add null check
    if (conversation && conversation.unreadCount > 0) {
      setConversations(prev => 
        prev.map(conv => 
          conv.id === conversation.id 
            ? { ...conv, unreadCount: 0 }
            : conv
        )
      );
    }
  };

  const handleSendMessage = async (messageText) => {
    if (!selectedConversation?.chatId || !messageText.trim() || !currentUser?.id) return;

    try {
      await chatService.sendMessage(selectedConversation.chatId, String(currentUser.id), messageText.trim());
      
      // Update last message in conversation list
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversation.id
            ? {
                ...conv,
                lastMessage: {
                  text: messageText.trim(),
                  timestamp: new Date(),
                  senderId: String(currentUser.id),
                  isRead: false
                }
              }
            : conv
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const startNewChat = async (otherUserId) => {
    if (!currentUser?.id) return;
    
    try {
      const otherUserIdStr = String(otherUserId);
      const currentUserIdStr = String(currentUser.id);
      const chatId = await chatService.createOrGetChat(currentUserIdStr, otherUserIdStr);
      
      // Check if conversation already exists (check both chatId and id)
      const existingConv = conversations.find(conv => 
        conv.chatId === chatId || conv.id === chatId
      );
      if (existingConv) {
        setSelectedConversation(existingConv);
        return existingConv;
      }

      // Fetch user profile from API or use cached profile
      let userProfile = userProfiles[otherUserIdStr];
      
      if (!userProfile) {
        try {
          const response = await userAPI.getById(otherUserIdStr);
          const userData = response.data || response;
          userProfile = {
            id: String(otherUserIdStr),
            name: userData.name || `User ${otherUserIdStr?.slice(0, 6)}`,
            avatar: userData.profile_picture || userData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userData.name || 'User')}&background=7c3aed&color=fff`,
            isOnline: false
          };
          // Cache the profile with string key
          setUserProfiles(prev => ({ ...prev, [String(otherUserIdStr)]: userProfile }));
        } catch (error) {
          console.warn(`Failed to fetch user ${otherUserIdStr} for new chat:`, error);
          userProfile = {
            id: String(otherUserIdStr),
            name: `User ${otherUserIdStr?.slice(0, 6)}`,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(`User ${otherUserIdStr}`)}&background=7c3aed&color=fff`,
            isOnline: false
          };
        }
      }

      // Create new conversation object
      const newConversation = {
        id: chatId,
        chatId: chatId,
        user: {
          id: otherUserIdStr,
          name: userProfile.name || `User ${otherUserIdStr?.slice(0, 6)}`,
          avatar: userProfile.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(userProfile.name || 'User')}&background=7c3aed&color=fff`,
          isOnline: userProfile.isOnline || false
        },
        lastMessage: null,
        unreadCount: 0
      };

      // Don't add to conversations list immediately - let Firebase listener handle it
      // This prevents duplicates when the Firebase listener picks up the new chat
      setSelectedConversation(newConversation);
      return newConversation;
    } catch (error) {
      console.error('Error starting new chat:', error);
    }
  };

  // Delete a conversation
  const deleteConversation = async (conversationId) => {
    if (!currentUser) return false;
    
    try {
      await chatService.deleteChat(conversationId, String(currentUser.id));
      
      // Remove from local state
      setConversations(prev => prev.filter(conv => conv.id !== conversationId));
      
      // Clear selection if deleted conversation was selected
      if (selectedConversation?.id === conversationId) {
        setSelectedConversation(null);
      }
      
      // Clear messages for this conversation
      setMessages(prev => {
        const newMessages = { ...prev };
        delete newMessages[conversationId];
        return newMessages;
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting conversation:', error);
      return false;
    }
  };


  // Set typing status
  const handleSetTypingStatus = async (isTyping) => {
    if (!selectedConversation?.chatId || !currentUser?.id) return;
    
    try {
      await chatService.setTypingStatus(selectedConversation.chatId, String(currentUser.id), isTyping);
    } catch (error) {
      console.error('Error setting typing status:', error);
    }
  };

  // Listen for typing status
  useEffect(() => {
    if (!selectedConversation?.chatId) return;

    const unsubscribe = chatService.listenForTyping(selectedConversation.chatId, (typingData) => {
      setTypingUsers(typingData);
    });

    return unsubscribe;
  }, [selectedConversation?.chatId]);

  const value = {
    conversations,
    selectedConversation,
    setSelectedConversation: handleConversationSelect,
    messages: selectedConversation ? messages[selectedConversation.chatId] || [] : [],
    loading: loading || authLoading,
    currentUser,
    sendMessage: handleSendMessage,
    startNewChat,
    deleteConversation,
    typingUsers,
    setTypingStatus: handleSetTypingStatus,
    userProfiles,
    token
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};
