// PortfolioCard.jsx
// Displays a single portfolio item card with an image, title, creator information, likes, comments, and tags.
import React from "react";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { FaStar, } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import Cookies from "js-cookie";
import Tag from "./ui/tag";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
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
  rating = 0,
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
  const token = Cookies.get('token')
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl bg-white/95 dark:bg-card border border-gray-300/50 dark:border-gray-800/100 hover-card transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer",
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0  transition-all duration-200 ease-in-out" />
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
            <Avatar className="size-6">
              <AvatarImage src={creatorImage} alt={creator} />
              <AvatarFallback>{creator.charAt(0)}</AvatarFallback>
            </Avatar>
            <span>{creator}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag, index) => (
            <Tag
              key={index}
              size="sm"
              onClick={onTagClick}
            >
              {tag}
            </Tag>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="size-4" />
              <span>{likes}</span>
            </div>
            <div className="flex   items-center gap-2">
              <MessageCircle className="size-4" />
              <span>{comments}</span>
            </div>
              <div className="flex items-center gap-1" aria-label={`Rating: ${rating} out of 5`}>
                {[...Array(5)].map((_, index) => {
                  const starIndex = index; // 0-based
                  const diff = rating - starIndex;
                  const fillPercent = diff >= 1 ? 100 : diff >= 0.5 ? 50 : 0;
                  return (
                    <span key={index} className="relative inline-block" style={{ width: 16, height: 16 }} aria-hidden="true">
                      {/* Base gray star */}
                      <FaStar size={16} className="text-gray-300" />
                      {/* Overlay yellow star clipped by width */}
                      {fillPercent > 0 && (
                        <span className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                          <FaStar size={16} className="text-yellow-400" />
                        </span>
                      )}
                    </span>
                  );
                })}
              </div>
          
        
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard; 