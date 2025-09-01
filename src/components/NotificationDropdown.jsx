import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, User as UserIcon, X } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useNotifications } from "@/contexts/NotificationContext";
import { useChat } from "@/contexts/ChatContext";
import { useNavigate } from "react-router-dom";

// Notifications are provided by NotificationContext



// Notification item component for reuse
const NotificationItem = ({ notification, onRemove, onClick }) => (
  <div
    className={`flex items-start space-x-3 py-3 px-4 hover:bg-muted/50 transition-colors relative group cursor-pointer ${
    notification.isNew ? 'bg-blue-50/50 dark:bg-blue-950/20' : ''
  }`}
    onClick={() => onClick?.(notification)}
    role="button"
    tabIndex={0}
  >
    {/* New notification indicator */}
    {notification.isNew && (
      <div className="absolute left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full" />
    )}
    
    <div className="relative flex-shrink-0">
      <Avatar className="size-8">
        <AvatarImage src={notification.avatar} alt={notification.actorName} />
        <AvatarFallback>{notification.actorName.charAt(0)}</AvatarFallback>
      </Avatar>
      {/* action icon */}
      <span className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow">
        {notification.type === "like" && <Heart className="size-3 text-pink-500" />}
        {notification.type === "follow" && <UserIcon className="size-3 text-cyan-500" />}
        {notification.type === "comment" && <MessageCircle className="size-3 text-amber-500" />}
        {notification.type === "message" && <MessageCircle className="size-3 text-purple-500" />}
      </span>
    </div>
    
    <div className="flex-1 text-sm leading-5 whitespace-normal break-words">
      <span className="font-medium">{notification.actorName}</span> {notification.action}
    </div>
    
    <div className="flex items-center space-x-2 flex-shrink-0">
      <span className="text-xs text-muted-foreground">{notification.time}</span>
      <Button
        variant="ghost"
        size="sm"
        className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-red-100 dark:hover:bg-red-900/20"
        onClick={(e) => {
          e.stopPropagation();
          onRemove(notification.id);
        }}
        aria-label="Remove notification"
      >
        <X className="size-3 text-red-500" />
      </Button>
    </div>
  </div>
);

const NotificationDropdown = () => {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { notifications, removeNotification, markAllAsRead, unreadCount } = useNotifications();
  const { conversations, setSelectedConversation, startNewChat } = useChat();
  const navigate = useNavigate();

  const handleRemoveNotification = (id) => {
    removeNotification(id);
  };

  const newNotificationsCount = unreadCount;

  const createTriggerButton = (onClick) => (
    <Button
      variant="ghost"
      size="icon"
      className="relative text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20"
      aria-label="Notifications"
      onClick={onClick}
    >
      <Bell className="size-5 dark:text-white" />
      {/* Unread indicator */}
      {newNotificationsCount > 0 && (
        <span className="absolute -top-0 -right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium leading-none text-white bg-red-500 rounded-full">
          {newNotificationsCount}
        </span>
      )}
    </Button>
  );

  const handleNotificationClick = async (n) => {
    try {
      if (n.type === "message") {
        // Try to select by chatId first
        let targetConv = null;
        if (n.chatId) {
          targetConv = conversations.find(
            (c) => c.chatId === n.chatId || c.id === n.chatId
          );
        }

        if (targetConv) {
          setSelectedConversation(targetConv);
        } else if (n.userId) {
          const conv = await startNewChat(String(n.userId));
          if (conv) setSelectedConversation(conv);
        }

        navigate("/chat");
        setDesktopOpen(false);
        setMobileOpen(false);
      }
    } catch (err) {
      console.error("Failed to handle notification click", err);
    }
  };

  return (
    <>
      {/* Desktop: DropdownMenu with blur background */}
      <div className="hidden md:block">
        <DropdownMenu open={desktopOpen} onOpenChange={(open) => {
          setDesktopOpen(open);
          if (open) markAllAsRead();
        }}>
          <DropdownMenuTrigger asChild>
            {createTriggerButton()}
          </DropdownMenuTrigger>
          <DropdownMenuContent 
            align="end" 
            className="w-80 max-h-[24rem] overflow-y-auto p-0 backdrop-blur-md bg-white/95 dark:bg-gray-900/95 border border-gray-200/50 dark:border-gray-700/50 shadow-xl"
          >
            <DropdownMenuLabel className="px-4 py-3 border-b border-gray-200/50 dark:border-gray-700/50">
              Notifications
            </DropdownMenuLabel>
            <div className="max-h-[20rem] overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="border-b border-border/50 last:border-b-0">
                  <NotificationItem notification={n} onRemove={handleRemoveNotification} onClick={handleNotificationClick} />
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="p-8 text-sm text-center text-muted-foreground">
                  No notifications
                </div>
              )}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile: Sheet */}
      <div className="md:hidden">
        <Sheet open={mobileOpen} onOpenChange={(open) => {
          setMobileOpen(open);
          if (open) markAllAsRead();
        }}>
          <SheetTrigger asChild>
            {createTriggerButton()}
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[400px] p-0">
            <SheetHeader className="px-4 py-6 border-b">
              <SheetTitle className="text-left">Notifications</SheetTitle>
              <SheetDescription className="sr-only">
                View and manage your notifications
              </SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto">
              {notifications.map((n) => (
                <div key={n.id} className="border-b border-border/50 last:border-b-0">
                  <NotificationItem notification={n} onRemove={handleRemoveNotification} onClick={handleNotificationClick} />
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="p-8 text-sm text-center text-muted-foreground">
                  No notifications
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NotificationDropdown;
