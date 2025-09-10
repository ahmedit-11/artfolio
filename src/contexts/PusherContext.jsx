import React, { createContext, useContext, useEffect, useState } from 'react';
import Pusher from 'pusher-js';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PusherContext = createContext();

export const usePusher = () => {
  const context = useContext(PusherContext);
  if (!context) {
    throw new Error('usePusher must be used within a PusherProvider');
  }
  return context;
};

export const PusherProvider = ({ children }) => {
  const [connectionState, setConnectionState] = useState('disconnected');
  const { currentUser } = useSelector(state => state.currentUser);

  // localStorage helper functions
  const getStorageKey = (userId) => `notifications_${userId}`;

  const loadNotificationsFromStorage = (userId) => {
    try {
      const stored = localStorage.getItem(getStorageKey(userId));
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading notifications from localStorage:', error);
      return [];
    }
  };

  const saveNotificationsToStorage = (userId, notifications) => {
    try {
      localStorage.setItem(getStorageKey(userId), JSON.stringify(notifications));
    } catch (error) {
      console.error('Error saving notifications to localStorage:', error);
    }
  };

  // Initialize notifications from localStorage
  const [notifications, setNotifications] = useState(() => {
    return currentUser?.id ? loadNotificationsFromStorage(currentUser.id) : [];
  });

  // Load notifications when user changes
  useEffect(() => {
    if (currentUser?.id) {
      const userNotifications = loadNotificationsFromStorage(currentUser.id);
      setNotifications(userNotifications);
    } else {
      setNotifications([]);
    }
  }, [currentUser?.id]);

  // Helper function to add notification to array
  const addNotification = (type, data) => {
    const notification = {
      id: Date.now() + Math.random(), // Simple unique ID
      type,
      data,
      timestamp: new Date(),
      read: false,
      userId: currentUser?.id // Store which user this notification belongs to
    };
    
    setNotifications(prev => {
      const updated = [notification, ...prev];
      if (currentUser?.id) {
        saveNotificationsToStorage(currentUser.id, updated);
      }
      return updated;
    });
    return notification;
  };

  // Helper function to mark notification as read
  const markAsRead = (notificationId) => {
    setNotifications(prev => {
      const updated = prev.map(notif => 
        notif.id === notificationId ? { ...notif, read: true } : notif
      );
      if (currentUser?.id) {
        saveNotificationsToStorage(currentUser.id, updated);
      }
      return updated;
    });
  };

  // Helper function to mark all as read
  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(notif => ({ ...notif, read: true }));
      if (currentUser?.id) {
        saveNotificationsToStorage(currentUser.id, updated);
      }
      return updated;
    });
  };

  // Helper function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    if (currentUser?.id) {
      localStorage.removeItem(getStorageKey(currentUser.id));
    }
  };

  useEffect(() => {
    if (!currentUser?.id) return;

    // Initialize Pusher
    const pusher = new Pusher('7ca1eab43af7e077f62e', { cluster: 'ap4' });
    
    pusher.connection.bind('connected', () => setConnectionState('connected'));
    pusher.connection.bind('disconnected', () => setConnectionState('disconnected'));

    // Subscribe to notifications channel
    const channel = pusher.subscribe(`notifications.${currentUser.id}`);

    // Listen for events, show toast notifications AND store in array
    channel.bind('follow.added', (data) => {
      const message = `${data.follower_name || data.user_name} started following you`;
      toast.info(message);
      addNotification('follow', { ...data, message });
    });
    
    channel.bind('comment.added', (data) => {
      const message = `${data.user_name} commented on your portfolio "${data.portfolio_title || 'your portfolio'}"`;
      toast.info(message);
      addNotification('comment', { ...data, message });
    });
    
    channel.bind('like.added', (data) => {
      const message = `${data.user_name} liked your portfolio "${data.portfolio_title || 'your portfolio'}"`;
      toast.info(message);
      addNotification('like', { ...data, message });
    });

    return () => pusher.disconnect();
  }, [currentUser?.id]);

  return (
    <PusherContext.Provider value={{ 
      connectionState, 
      isConnected: connectionState === 'connected',
      notifications,
      unreadCount: notifications.filter(n => !n.read).length,
      markAsRead,
      markAllAsRead,
      clearAllNotifications
    }}>
      {children}
    </PusherContext.Provider>
  );
};
