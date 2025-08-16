import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, Settings } from "lucide-react";

const PROFILE_KEY = "artfolio_profile";
function loadProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

const AvatarMenu = () => {
  const storedProfile = loadProfile();
  const username = "creative_artist";
  const fullName = storedProfile?.fullName || "Sarah Anderson";
  const avatar = storedProfile?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=creative_artist";
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="size-9 border-2 mr-5 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
            <AvatarImage src={avatar} alt={fullName} />
            <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
              {fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">@{username}</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem className="cursor-pointer" onClick={handleProfileClick}>
            <User className="size-4 mr-2" />
            <span>Profile</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem className="cursor-pointer" onClick={handleSettingsClick}>
            <Settings className="size-4 mr-2" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default AvatarMenu;