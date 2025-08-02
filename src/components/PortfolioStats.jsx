// PortfolioStats.jsx
// Displays statistics about a portfolio item, including views, likes, comments, and shares, with icons and counts.
import React, { useState } from "react";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import CommentSection from "./CommentSection";

// PortfolioStats component renders statistics about a portfolio item
const PortfolioStats = ({
  className,
  views = 0,
  likes: initialLikes = 0,
  comments = 0,
  shares = 0,
  onLikeClick = () => {},
  onCommentClick = () => {},
  onShareClick = () => {},
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
    onLikeClick?.();
  };

  const handleCommentClick = () => {
    setIsCommentSectionOpen(true);
    onCommentClick?.();
  };

  return (
    <>
      <div className={cn("flex items-center gap-6", className)}>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Eye className="size-5" />
          <span>{views} views</span>
        </div>
        <button
          className={cn(
            "flex items-center gap-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400",
            isLiked && "text-red-500 dark:text-red-400"
          )}
          onClick={handleLikeClick}
        >
          <Heart className={cn("size-5", isLiked && "fill-current")} />
          <span>{likes} likes</span>
        </button>
        <button
          className="flex items-center gap-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
          onClick={handleCommentClick}
        >
          <MessageCircle className="size-5" />
          <span>{comments} comments</span>
        </button>
        <button
          className="flex items-center gap-2 text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400"
          onClick={onShareClick}
        >
          <Share2 className="size-5" />
          <span>{shares} shares</span>
        </button>
      </div>

      <CommentSection
        isOpen={isCommentSectionOpen}
        onClose={() => setIsCommentSectionOpen(false)}
        portfolioId={title}
      />
    </>
  );
};

export default PortfolioStats; 