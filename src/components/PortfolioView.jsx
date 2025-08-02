// PortfolioView.jsx
// Displays a detailed view of a portfolio item with a large image, title, creator information, statistics, and tags.
import React from "react";
import PortfolioDetail from "./PortfolioDetail";
import PortfolioStats from "./PortfolioStats";
import PortfolioTags from "./PortfolioTags";
import { cn } from "@/lib/utils";

// PortfolioView component renders a detailed view of a portfolio item with all its components
const PortfolioView = ({
  className,
  image,
  title,
  creator,
  creatorImage,
  likes,
  comments,
  tags,
  views = 0,
  shares = 0,
  onCreatorClick = () => {},
  onLikeClick = () => {},
  onCommentClick = () => {},
  onShareClick = () => {},
  onTagClick = () => {},
}) => {
  return (
    <div className={cn("space-y-6", className)}>
      <PortfolioDetail
        image={image}
        title={title}
        creator={creator}
        creatorImage={creatorImage}
        likes={likes}
        comments={comments}
        tags={tags}
        onCreatorClick={onCreatorClick}
        onLikeClick={onLikeClick}
        onCommentClick={onCommentClick}
        onTagClick={onTagClick}
      />
      <PortfolioStats
        views={views}
        likes={likes}
        comments={comments}
        shares={shares}
        onLikeClick={onLikeClick}
        onCommentClick={onCommentClick}
        onShareClick={onShareClick}
      />
      <PortfolioTags
        tags={tags}
        onTagClick={onTagClick}
      />
    </div>
  );
};

export default PortfolioView; 