import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
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
import { getProfileImageUrl } from "@/utils/imageUtils";

const AvatarMenu = () => {
  const navigate = useNavigate();
  const { currentUser } = useSelector(state => state.currentUser);

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  // Get user data with fallbacks
  const fullName = currentUser?.name || "User";
  const email = currentUser?.email || "";
  const profilePicture = currentUser?.profile_picture || currentUser?.avatar;
  const avatarUrl = profilePicture ? getProfileImageUrl(profilePicture) : null;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger className="focus:outline-none">
          <Avatar className="size-9 border-2 mr-5 border-purple-200 dark:border-purple-800 hover:border-purple-500 dark:hover:border-purple-500 transition-colors cursor-pointer">
            <AvatarImage src={avatarUrl} alt={fullName} />
            <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
              {fullName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{fullName}</p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
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