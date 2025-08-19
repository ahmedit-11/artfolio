import React from "react";
import Tag from "@/components/ui/tag";
import { TagIcon } from "lucide-react";

const PortfolioTags = ({ tags }) => {
  if (!tags || tags.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <TagIcon className="size-4 text-muted-foreground" />
        <h3 className="font-semibold">Tags</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <Tag key={index} size="default">
            {tag}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default PortfolioTags;
