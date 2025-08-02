// CommentSection.jsx
// Displays a list of comments with replies, like functionality, and a form to add new comments or replies.
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Reply } from "lucide-react";
import { cn } from "@/lib/utils";

// CommentSection component manages comments, replies, and user interactions
const CommentSection = ({ isOpen, onClose, portfolioId }) => {
  const [comment, setComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Alex Johnson",
      userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=alex",
      text: "Amazing work! The color palette is stunning.",
      timestamp: "2 hours ago",
      replies: [
        {
          id: 11,
          user: "Sarah Chen",
          userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
          text: "I agree! The colors really pop!",
          timestamp: "1 hour ago",
        }
      ]
    },
    {
      id: 2,
      user: "Maya Patel",
      userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=maya",
      text: "Love how you've combined traditional and digital elements.",
      timestamp: "5 hours ago",
      replies: []
    },
    {
      id: 3,
      user: "Sarah Chen",
      userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      text: "The attention to detail is incredible!",
      timestamp: "1 day ago",
      replies: []
    },
  ]);

  const handleComment = (e) => {
    e.preventDefault();
    if (comment.trim()) {
      const newComment = {
        id: Date.now(),
        user: "Current User",
        userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=current_user",
        text: comment,
        timestamp: "Just now",
        replies: []
      };
      setComments([newComment, ...comments]);
      setComment("");
    }
  };

  const handleReply = (e, parentId) => {
    e.preventDefault();
    if (replyText.trim()) {
      const newReply = {
        id: Date.now(),
        user: "Current User",
        userImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=current_user",
        text: replyText,
        timestamp: "Just now"
      };

      setComments(comments.map(comment => {
        if (comment.id === parentId) {
          return {
            ...comment,
            replies: [...comment.replies, newReply]
          };
        }
        return comment;
      }));

      setReplyText("");
      setReplyTo(null);
    }
  };

  const CommentItem = ({ comment, isReply = false }) => (
    <div className={cn("flex gap-4", isReply && "ml-12")}>
      <Avatar>
        <AvatarImage src={comment.userImage} />
        <AvatarFallback>{comment.user[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-medium">{comment.user}</span>
          <span className="text-sm text-muted-foreground">
            {comment.timestamp}
          </span>
        </div>
        <p className="mt-1">{comment.text}</p>
        {!isReply && (
          <button
            onClick={() => setReplyTo(comment.id)}
            className="mt-2 text-sm text-muted-foreground hover:text-purple-600 dark:hover:text-purple-400 flex items-center gap-1"
          >
            <Reply className="size-4" />
            Reply
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div
      className={cn(
        "fixed inset-0 bg-black/50 z-50 transition-all duration-300",
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onClick={onClose}
    >
      <div
        className={cn(
          "fixed inset-0 bg-background transition-all duration-300 flex flex-col",
          isOpen ? "translate-y-0" : "translate-y-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between sticky top-0 bg-background z-10">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Comments</h2>
            <span className="text-sm text-muted-foreground">({comments.length})</span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="size-5" />
          </Button>
        </div>

        {/* Comments List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6 max-w-3xl mx-auto w-full">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-4">
              <CommentItem comment={comment} />
              {comment.replies.length > 0 && (
                <div className="space-y-4">
                  {comment.replies.map((reply) => (
                    <CommentItem key={reply.id} comment={reply} isReply />
                  ))}
                </div>
              )}
              {replyTo === comment.id && (
                <form onSubmit={(e) => handleReply(e, comment.id)} className="ml-12 flex gap-4">
                  <Avatar>
                    <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=current_user" />
                    <AvatarFallback>CU</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder={`Reply to ${comment.user}...`}
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      className="mb-2"
                      autoFocus
                    />
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setReplyTo(null)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit" disabled={!replyText.trim()}>
                        Reply
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          ))}
        </div>

        {/* Comment Form */}
        <div className="p-4 border-t sticky bottom-0 bg-background">
          <div className="max-w-3xl mx-auto w-full">
            <form onSubmit={handleComment} className="flex gap-4">
              <Avatar>
                <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=current_user" />
                <AvatarFallback>CU</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <Input
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mb-2"
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={!comment.trim()}>
                    Comment
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSection; 