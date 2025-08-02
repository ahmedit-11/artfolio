// Profile.jsx
// Displays a user's profile with avatar, name, bio, and a grid of their portfolio items.
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Mail, MapPin, Link as LinkIcon } from "lucide-react";
import PortfolioGrid from "./PortfolioGrid";
import { cn } from "@/lib/utils";

// Profile component renders a user's profile with their information and portfolio items
const Profile = ({
  className,
  user = {
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    bio: "Digital artist and UI/UX designer based in New York. Passionate about creating beautiful and functional designs.",
    location: "New York, USA",
    email: "john.doe@example.com",
    website: "https://johndoe.com",
    followers: 1234,
    following: 567,
    portfolioItems: [
      {
        id: 1,
        title: "Minimalist UI Design Collection",
        creator: "John Doe",
        creatorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
        image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
        likes: 248,
        comments: 36,
        tags: ["UI/UX", "Minimalism"],
      },
      {
        id: 2,
        title: "Abstract Digital Art Series",
        creator: "John Doe",
        creatorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
        image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        likes: 192,
        comments: 24,
        tags: ["Digital Art", "Abstract"],
      },
    ],
  },
  onEditProfile = () => {},
  onMessageClick = () => {},
  onWebsiteClick = () => {},
  onPortfolioItemClick = () => {},
  onPortfolioCreatorClick = () => {},
  onPortfolioLikeClick = () => {},
  onPortfolioCommentClick = () => {},
  onPortfolioTagClick = () => {},
}) => {
  return (
    <div className={cn("space-y-8", className)}>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-32 h-32 rounded-full object-cover"
          />
        </div>
        <div className="flex-grow space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{user.name}</h1>
              <p className="text-muted-foreground">{user.bio}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onEditProfile}>
                <Edit className="size-4 mr-2" />
                Edit Profile
              </Button>
              <Button onClick={onMessageClick}>
                <Mail className="size-4 mr-2" />
                Message
              </Button>
            </div>
          </div>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="size-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <Mail className="size-4" />
              <span>{user.email}</span>
            </div>
            <div className="flex items-center gap-1">
              <LinkIcon className="size-4" />
              <button
                className="hover:text-foreground transition-colors"
                onClick={onWebsiteClick}
              >
                {user.website}
              </button>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <span className="font-semibold">{user.followers}</span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </div>
            <div>
              <span className="font-semibold">{user.following}</span>
              <span className="text-muted-foreground ml-1">Following</span>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
        <PortfolioGrid
          items={user.portfolioItems}
          onItemClick={onPortfolioItemClick}
          onCreatorClick={onPortfolioCreatorClick}
          onLikeClick={onPortfolioLikeClick}
          onCommentClick={onPortfolioCommentClick}
          onTagClick={onPortfolioTagClick}
        />
      </div>
    </div>
  );
};

export default Profile; 