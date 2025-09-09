// PortfolioCard.jsx
// Displays a single portfolio item card with an image, title, creator information, likes, comments, and tags.
import React from "react";
import { Heart, MessageCircle, Share2, Star } from "lucide-react";
import { FaStar, } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import  Tag  from '@/components/ui/tag';
import Cookies from 'js-cookie';
import { getPortfolioMediaUrl, getProfileImageUrl } from '@/utils/mediaUtils';

// PortfolioCard component renders a card for a single portfolio item with interactive features
const PortfolioCard = ({
  portfolio,
  id,
  slug,
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
  // If portfolio object is passed, extract properties from it
  const portfolioData = portfolio || {
    id,
    slug,
    title,
    creator,
    creatorImage,
    image,
    likes,
    comments,
    tags,
    rating
  };
  
  const {
    id: portfolioId = id,
    slug: portfolioSlug = slug,
    title: portfolioTitle = title,
    user,
    creator: portfolioCreator = creator,
    creator_image: portfolioCreatorImage = creatorImage,
    image: portfolioImage = image,
    cover_image,
    media,
    likes_count: portfolioLikes = likes,
    comments_count: portfolioComments = comments,
    tags: portfolioTags = tags,
    rating: portfolioRating = rating
  } = portfolioData;

  // Handle cover image first, then fallback to media array or direct image field
  const rawImagePath = cover_image || portfolioImage || (media && media.length > 0 ? media[0].file_path : null);
  const displayImage = getPortfolioMediaUrl(rawImagePath);
  
  
  // Handle creator name from user object or direct creator prop
  const creatorName = user?.name || portfolioCreator || 'Unknown';
  const rawCreatorImg = user?.profile_picture;
  const creatorImg = getProfileImageUrl(rawCreatorImg);
  
  const navigate = useNavigate();

  const handleCardClick = (e) => {
    e.preventDefault();
    if (onCardClick) {
      onCardClick();
    } else {
      navigate(`/projects/${portfolioSlug || portfolioId}`);
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
          src={displayImage}
          alt={portfolioTitle}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0  transition-all duration-200 ease-in-out" />
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title and Creator */}
        <div className="mb-3">
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{portfolioTitle}</h3>
          <div 
            className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer hover:text-purple-600 dark:hover:text-purple-400"
            onClick={(e) => {
              e.stopPropagation();
              onCreatorClick?.();
            }}
          >
            <Avatar className="size-6">
              <AvatarImage src={creatorImg} alt={creatorName} />
              <AvatarFallback>{creatorName?.charAt(0) || 'U'}</AvatarFallback>
            </Avatar>
            <span>{creatorName}</span>
          </div>
        </div>

        {/* Tags */}
        {portfolioTags && portfolioTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {portfolioTags.slice(0, 3).map((tag, index) => (
              <Tag
                key={tag.id || index}
                size="sm"
                onClick={() => onTagClick?.(tag)}
                className="text-xs"
              >
                {tag.name || tag}
              </Tag>
            ))}
            {portfolioTags.length > 3 && (
              <span className="text-xs text-muted-foreground self-center">
                +{portfolioTags.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Stats */}
        <div className="flex justify-between items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Heart className="size-4" />
              <span>{portfolioLikes || 0}</span>
            </div>
            <div className="flex   items-center gap-2">
              <MessageCircle className="size-4" />
              <span>{portfolioComments || 0}</span>
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