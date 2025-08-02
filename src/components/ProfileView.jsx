// ProfileView.jsx
// Displays a detailed view of a user's profile with all its components, including profile information, statistics, and portfolio items.
import React from "react";
import Profile from "./Profile";
import ProfileStats from "./ProfileStats";
import { cn } from "@/lib/utils";

// ProfileView component renders a detailed view of a user's profile with all its components
const ProfileView = ({
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
  // Calculate total likes from portfolio items
  const totalLikes = user.portfolioItems.reduce((sum, item) => sum + item.likes, 0);

  return (
    <div className={cn("space-y-8", className)}>
      <Profile
        user={user}
        onEditProfile={onEditProfile}
        onMessageClick={onMessageClick}
        onWebsiteClick={onWebsiteClick}
        onPortfolioItemClick={onPortfolioItemClick}
        onPortfolioCreatorClick={onPortfolioCreatorClick}
        onPortfolioLikeClick={onPortfolioLikeClick}
        onPortfolioCommentClick={onPortfolioCommentClick}
        onPortfolioTagClick={onPortfolioTagClick}
      />
      <ProfileStats
        followers={user.followers}
        following={user.following}
        portfolioItems={user.portfolioItems.length}
        totalLikes={totalLikes}
      />
    </div>
  );
};

export default ProfileView; 