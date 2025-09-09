import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Heart, Loader2 } from "lucide-react";
import { toggleLikeThunk } from "../store/social/thunk/toggleLikeThunk";
import { toast } from "react-toastify";

const LikeButton = ({ projectId, isLiked: initialIsLiked = false, likesCount: initialLikesCount = 0, variant = "ghost", size = "sm" }) => {
  const dispatch = useDispatch();
  const { likeLoading, isLiked, likesCount, currentProjectId } = useSelector(state => state.social);



  const handleToggleLike = async () => {
    const currentLikedState = isLiked !== undefined ? isLiked : initialIsLiked;
    
    try {
      const result = await dispatch(toggleLikeThunk(projectId));
      
      if (result.type === 'social/toggleLike/fulfilled') {
        if (result.payload && result.payload.message) {
          toast.success(result.payload.message);
        } else {
          toast.success(result.payload.liked ? "Liked successfully!" : "Unliked successfully!");
        }
      } else {
        toast.error("Failed to update like status. Please try again.");
      }
    } catch (error) {
      console.error("Like toggle error:", error);
      toast.error("Failed to update like status. Please try again.");
    }
  };

  // Use Redux state if available and for current project, otherwise fall back to prop
  const currentIsLiked = (currentProjectId === projectId && isLiked !== undefined) ? isLiked : initialIsLiked;
  const currentLikesCount = (currentProjectId === projectId && likesCount !== undefined) ? likesCount : initialLikesCount;

  return (
    <Button
      variant="ghost"
      onClick={handleToggleLike}
      disabled={likeLoading}
      className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 h-auto flex flex-col transition-all duration-200"
    >
      {likeLoading ? (
        <Loader2 className="size-5 mx-auto mb-2 animate-spin text-purple-600" />
      ) : (
        <Heart className={`size-5 mx-auto mb-2 text-purple-600 transition-all duration-200 ${currentIsLiked ? "fill-current" : ""}`} />
      )}
      <div className="font-semibold">{currentLikesCount}</div>
      <div className="text-sm text-muted-foreground">Likes</div>
    </Button>
  );
};

export default LikeButton;
