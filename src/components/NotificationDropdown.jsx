import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Bell, Heart, MessageCircle, User as UserIcon } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

// Temporary static notifications until API integration
const mockNotifications = [
  {
    id: 1,
    actorName: "Alex",
    type: "like",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    action: 'liked your artwork "Dreamscape"',
    time: "2m",
  },
  {
    id: 2,
    actorName: "Maria",
    type: "follow",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    action: "started following you",
    time: "1h",
  },
  {
    id: 3,
    actorName: "John",
    type: "comment",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
    action: 'commented on "Sunset Boulevard"',
    time: "3h",
  },
];



const NotificationDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20"
          aria-label="Notifications"
        >
          <Bell className="size-5  dark:text-white" />
          {/* Unread indicator */}
          <span className="absolute -top-0 -right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-medium leading-none text-white bg-red-500 rounded-full">
            {mockNotifications.length}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 max-h-[24rem] overflow-y-auto">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {mockNotifications.map((n) => (
          <DropdownMenuItem key={n.id} className="flex items-start space-x-3 py-2">
            <div className="relative flex-shrink-0">
            <Avatar className="size-8">
              <AvatarImage src={n.avatar} alt={n.actorName} />
              <AvatarFallback>{n.actorName.charAt(0)}</AvatarFallback>
            </Avatar>
            {/* action icon */}
            <span className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5 shadow">
              {n.type === "like" && <Heart className="size-3 text-pink-500" />}
              {n.type === "follow" && <UserIcon className="size-3 text-cyan-500" />}
              {n.type === "comment" && <MessageCircle className="size-3 text-amber-500" />}
            </span>
          </div>
            
            <div className="flex-1 text-sm leading-5 whitespace-normal break-words">
              <span className="font-medium">{n.actorName}</span> {n.action}
            </div>
            <span className="ml-auto text-xs text-muted-foreground flex-shrink-0">{n.time}</span>
          </DropdownMenuItem>
        ))}
        {mockNotifications.length === 0 && (
          <div className="p-4 text-sm text-center text-muted-foreground">No notifications</div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropdown;
