import React from "react";
import { Badge } from "./badge";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const Tag = ({ 
  children, 
  size = "default", 
  removable = false, 
  onRemove, 
  onClick,
  className,
  ...props 
}) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    default: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base"
  };

  const handleClick = (e) => {
    if (onClick) {
      e.stopPropagation();
      onClick(children);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove(children);
    }
  };

  return (
    <Badge
      className={cn(
        "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-transparent hover:bg-purple-200 dark:hover:bg-purple-900/30 transition-colors cursor-pointer",
        sizeClasses[size],
        removable && "pr-1",
        onClick && "hover:bg-purple-200 dark:hover:bg-purple-900/30",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <span className={removable ? "mr-1" : ""}>{children}</span>
      {removable && (
        <X
          className="size-3 cursor-pointer hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          onClick={handleRemove}
        />
      )}
    </Badge>
  );
};

export default Tag;
