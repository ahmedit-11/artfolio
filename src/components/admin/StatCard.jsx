// StatCard.jsx
// Reusable statistics card component for admin sections
import React from 'react';
import { cn } from '@/lib/utils';

const StatCard = ({ title, value, icon: Icon, color = "blue", className }) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400",
    green: "bg-green-50 text-green-600 dark:bg-green-950/50 dark:text-green-400",
    red: "bg-red-50 text-red-600 dark:bg-red-950/50 dark:text-red-400",
    orange: "bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400",
    purple: "bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400",
    gray: "bg-gray-50 text-gray-600 dark:bg-gray-950/50 dark:text-gray-400"
  };

  return (
    <div className={cn(
      "bg-white/95 dark:bg-card border border-gray-100/50 dark:border-gray-800/50 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
        </div>
        {Icon && (
          <div className={cn(
            "p-3 rounded-full",
            colorClasses[color] || colorClasses.blue
          )}>
            <Icon className="size-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
