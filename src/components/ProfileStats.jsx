// ProfileStats.jsx
// Displays statistics about a user's profile, including followers, following, and portfolio items, with counts and labels.
import React from "react";
import { Users, Image, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

// ProfileStats component renders statistics about a user's profile
const ProfileStats = ({
  className,
  followers = 0,
  following = 0,
  portfolioItems = 0,
  totalLikes = 0,
}) => {
  return (
    <div className={cn("grid grid-cols-2 sm:grid-cols-4 gap-4", className)}>
      <div className="flex flex-col items-center p-4 bg-card rounded-lg">
        <Users className="size-6 text-muted-foreground mb-2" />
        <span className="text-2xl font-bold">{followers}</span>
        <span className="text-sm text-muted-foreground">Followers</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-card rounded-lg">
        <Users className="size-6 text-muted-foreground mb-2" />
        <span className="text-2xl font-bold">{following}</span>
        <span className="text-sm text-muted-foreground">Following</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-card rounded-lg">
        <Image className="size-6 text-muted-foreground mb-2" />
        <span className="text-2xl font-bold">{portfolioItems}</span>
        <span className="text-sm text-muted-foreground">Portfolio Items</span>
      </div>
      <div className="flex flex-col items-center p-4 bg-card rounded-lg">
        <Heart className="size-6 text-muted-foreground mb-2" />
        <span className="text-2xl font-bold">{totalLikes}</span>
        <span className="text-sm text-muted-foreground">Total Likes</span>
      </div>
    </div>
  );
};

export default ProfileStats; 