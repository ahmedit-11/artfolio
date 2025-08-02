// PortfolioTags.jsx
// Displays a list of tags associated with a portfolio item, with the ability to click on tags to filter or navigate.
import React from "react";
import { Tag } from "lucide-react";
import { cn } from "@/lib/utils";

// PortfolioTags component renders a list of tags for a portfolio item
const PortfolioTags = ({
  className,
  tags = [],
  onTagClick = () => {},
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
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
  );
};

export default PortfolioTags; 