import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { MessageCircle, Loader2 } from "lucide-react";

const CommentButton = ({ projectSlug, commentsCount: initialCommentsCount = 0, onClick }) => {
  const dispatch = useDispatch();
  const { loading, comments, currentProjectId } = useSelector(state => state.comments);

  // Use Redux state if available for current project, otherwise fall back to prop
  const currentCommentsCount = currentProjectId === projectSlug && comments.length !== undefined 
    ? comments.length 
    : initialCommentsCount;

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      disabled={loading}
      className="text-center p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/20 h-auto flex flex-col transition-all duration-200"
    >
      {loading ? (
        <Loader2 className="size-5 mx-auto mb-2 animate-spin text-purple-600" />
      ) : (
        <MessageCircle className="size-5 mx-auto mb-2 text-purple-600" />
      )}
      <div className="font-semibold">{currentCommentsCount}</div>
      <div className="text-sm text-muted-foreground">Comments</div>
    </Button>
  );
};

export default CommentButton;
