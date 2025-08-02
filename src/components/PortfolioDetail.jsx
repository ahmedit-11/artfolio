// PortfolioDetail.jsx
// Displays a detailed view of a portfolio item with a large image, title, creator information, likes, comments, and tags.
import React, { useState, useEffect } from "react";
import { Heart, MessageCircle, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentSection from "./CommentSection";

// PortfolioDetail component renders a detailed view of a single portfolio item with interactive features
const PortfolioDetail = ({
  id,
  image,
  title,
  creator,
  creatorImage,
  likes: initialLikes,
  comments,
  tags,
  className,
  onCreatorClick,
  onLikeClick,
  onCommentClick,
  onTagClick,
  isLiked: initialIsLiked = false,
}) => {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likes, setLikes] = useState(initialLikes);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  // Update likes when initialLikes changes
  useEffect(() => {
    setLikes(initialLikes);
  }, [initialLikes]);

  // Update isLiked when initialIsLiked changes
  useEffect(() => {
    setIsLiked(initialIsLiked);
  }, [initialIsLiked]);

  const handleLikeClick = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikes(prev => newIsLiked ? prev + 1 : prev - 1);
    onLikeClick?.(newIsLiked);
  };

  const handleCommentClick = () => {
    setIsCommentSectionOpen(true);
    onCommentClick?.();
  };

  return (
    <div className={cn("space-y-6", className)}>
      <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{title}</h1>
        <div className="flex items-center gap-3">
          <img
            src={creatorImage}
            alt={creator}
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={onCreatorClick}
          />
          <div>
            <p className="font-medium">{creator}</p>
            <p className="text-sm text-muted-foreground">Creator</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button
            className={cn(
              "flex items-center gap-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors",
              isLiked && "text-purple-600 dark:text-purple-400"
            )}
            onClick={handleLikeClick}
          >
            <Heart className={cn("size-5 ","color-purple-600", isLiked && "fill-current")} />
            <span>{likes} Likes</span>
          </button>
          <button
            className="flex items-center gap-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            onClick={handleCommentClick}
          >
            <MessageCircle className="size-5" />
            <span>{comments} Comments</span>
          </button>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <button
                key={index}
                className="text-sm bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                onClick={() => onTagClick(tag)}
              >
                <Tag className="size-4 inline mr-1" />
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      <CommentSection
        isOpen={isCommentSectionOpen}
        onClose={() => setIsCommentSectionOpen(false)}
        portfolioId={id}
        portfolioTitle={title}
      />
    </div>
  );
};

export default PortfolioDetail; 