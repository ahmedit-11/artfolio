// PortfolioCard.jsx
// Displays a single portfolio item card with an image, title, creator information, likes, comments, and tags.
import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// PortfolioCard component renders a card for a single portfolio item with interactive features
const PortfolioCard = ({
  id,
  title,
  creator,
  creatorImage,
  image,
  likes,
  comments,
  tags,
  className,
  onCardClick,
  onCreatorClick,
  onCommentClick,
  onTagClick,
  onShareClick,
}) => {
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    e.preventDefault();
    if (onCardClick) {
      onCardClick();
    } else {
      navigate(`/portfolio/${id}`);
    }
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-card hover-card transition-all duration-300",
        className
      )}
      onClick={handleCardClick}
    >
      {/* Image Container */}
      <div className="aspect-[4/3] relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Creator */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{title}</h3>
          <div 
            className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-purple-600 dark:hover:text-purple-400"
            onClick={(e) => {
              e.stopPropagation();
              onCreatorClick?.();
            }}
          >
            <div className="relative size-6">
              <img
                src={creatorImage}
                alt={creator}
                className="size-full rounded-full object-cover"
              />
            </div>
            <span>{creator}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-xs"
              onClick={(e) => {
                e.stopPropagation();
                onTagClick?.(tag);
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Heart className="size-4" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="size-4" />
              <span>{comments}</span>
            </div>
          </div>
          <button
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onShareClick?.();
            }}
          >
            <Share2 className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard; 