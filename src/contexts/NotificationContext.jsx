import React, { createContext, useContext, useMemo, useState } from "react";

const NotificationContext = createContext(null);

export const useNotifications = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notif) => {
    // notif: { type, actorName, avatar, action, time? }
    const id = `${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setNotifications((prev) => [
      {
        id,
        type: notif.type || "info",
        actorName: notif.actorName || "",
        avatar: notif.avatar || "",
        action: notif.action || "",
        time: notif.time || "now",
        chatId: notif.chatId || null,
        userId: notif.userId || null,
        isNew: true,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isNew: false })));
  };

  const clear = () => setNotifications([]);

  const unreadCount = useMemo(
    () => notifications.filter((n) => n.isNew).length,
    [notifications]
  );

  const value = useMemo(
    () => ({ notifications, addNotification, removeNotification, markAllAsRead, clear, unreadCount }),
    [notifications, unreadCount]
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
