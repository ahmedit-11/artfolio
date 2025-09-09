import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { UserPlus, UserMinus, Loader2 } from "lucide-react";
import { toggleFollowThunk } from "../../../store/social/thunk/toggleFollowThunk";
import { toast } from "react-toastify";

const FollowButton = ({ userId, isFollowing: initialIsFollowing = false }) => {
  const dispatch = useDispatch();
  const { loading, isFollowing } = useSelector(state => state.social);

  const handleToggleFollow = async () => {
    const currentFollowState = isFollowing !== undefined ? isFollowing : initialIsFollowing;
    
    try {
      const result = await dispatch(toggleFollowThunk(userId));
      
      if (result.payload && result.payload.message) {
        toast.success(result.payload.message);
      } else {
        toast.success(currentFollowState ? "Unfollowed successfully!" : "Followed successfully!");
      }
    } catch (error) {
      console.error("Follow toggle error:", error);
      toast.error("Failed to update follow status. Please try again.");
    }
  };

  // Use Redux state if available, otherwise fall back to prop
  const currentFollowState = isFollowing !== undefined ? isFollowing : initialIsFollowing;

  return (
    <Button
      onClick={handleToggleFollow}
      disabled={loading}
      variant={currentFollowState ? "destructive" : "default"}
      className="flex items-center gap-2"
    >
      {loading ? (
        <Loader2 className="size-4 animate-spin" />
      ) : currentFollowState ? (
        <UserMinus className="size-4" />
      ) : (
        <UserPlus className="size-4" />
      )}
      {loading ? "Processing..." : currentFollowState ? "Unfollow" : "Follow"}
    </Button>
  );
};

export default FollowButton;
