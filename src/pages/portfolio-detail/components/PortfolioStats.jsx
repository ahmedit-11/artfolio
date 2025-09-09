import React from "react";
import { Card } from "@/components/ui/card";
import { Eye, Heart, MessageCircle, Calendar } from "lucide-react";
import LikeButton from "@/components/LikeButton";

const PortfolioStats = ({ projectId, likes, comments, views, createdAt }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-6">
      <h3 className="font-semibold mb-4">Portfolio Stats</h3>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm">Likes</span>
          </div>
          <LikeButton 
            projectId={projectId}
            likesCount={likes || 0}
            variant="ghost"
            size="sm"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MessageCircle className="size-4 text-blue-500" />
            <span className="text-sm">Comments</span>
          </div>
          <span className="font-medium">{comments.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Eye className="size-4 text-green-500" />
            <span className="text-sm">Views</span>
          </div>
          <span className="font-medium">{views.toLocaleString()}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="size-4 text-purple-500" />
            <span className="text-sm">Created</span>
          </div>
          <span className="font-medium text-sm">{formatDate(createdAt)}</span>
        </div>
      </div>
    </Card>
  );
};

export default PortfolioStats;
