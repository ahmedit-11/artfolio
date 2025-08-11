// PortfolioTags.jsx
// Displays a list of tags associated with a portfolio item, with the ability to click on tags to filter or navigate.
import React from "react";
import { Tag as TagIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Tag from "./ui/tag";

// PortfolioTags component renders a list of tags for a portfolio item
const PortfolioTags = ({
  className,
  tags = [],
  onTagClick = () => {},
}) => {
  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {tags.map((tag, index) => (
        <div key={index} className="flex items-center">
          <TagIcon className="size-4 mr-1 text-purple-600 dark:text-purple-400" />
          <Tag onClick={onTagClick}>
            {tag}
          </Tag>
        </div>
      ))}
    </div>
  );
};

export default PortfolioTags; 