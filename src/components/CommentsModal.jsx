import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Send, Loader2, Flag, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReportModal from "./ReportModal";
import ConfirmDialog from "./ConfirmDialog";
import { reportAPI } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { addCommentThunk } from "@/store/comments/thunk/addCommentThunk";
import { deleteCommentThunk } from "@/store/comments/thunk/deleteCommentThunk";
import { getCommentsThunk } from "@/store/comments/thunk/getCommentsThunk";
import { getProfileImageUrl } from "@/utils/mediaUtils";
import { toast } from 'react-toastify';
import { useScrollToTop } from "../utils/scrollToTop";


const CommentsModal = ({ isOpen, onClose, portfolioSlug, portfolioTitle }) => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { loading: addingComment, deleteLoading, comments, currentProjectId } = useSelector(state => state.comments);
  const { currentUser } = useSelector(state => state.currentUser);
  
  const [newComment, setNewComment] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingComment, setReportingComment] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  // Fetch comments when modal opens
  useEffect(() => {
    if (isOpen && portfolioSlug) {
      dispatch(getCommentsThunk(portfolioSlug));
    }
  }, [isOpen, portfolioSlug, dispatch]);

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const result = await dispatch(addCommentThunk({ 
        projectSlug: portfolioSlug, 
        content: newComment 
      }));
      
      if (addCommentThunk.fulfilled.match(result)) {
        setNewComment("");
        toast.success("Comment added successfully!");
      } else {
        const errorMessage = result.payload || "Failed to add comment. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
      toast.error("An error occurred while adding comment.");
    }
  };

  // Handle delete comment with confirmation
  const handleDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setShowConfirmDialog(true);
  };

  const confirmDeleteComment = async () => {
    const commentId = commentToDelete;
    setShowConfirmDialog(false);
    setCommentToDelete(null);
    
    setDeletingCommentId(commentId);
    try {
      const result = await dispatch(deleteCommentThunk({ commentId }));
      
      if (deleteCommentThunk.fulfilled.match(result)) {
        toast.success("Comment deleted successfully!");
      } else {
        const errorMessage = result.payload || "Failed to delete comment. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Failed to delete comment:", error);
      toast.error("An error occurred while deleting comment.");
    } finally {
      setDeletingCommentId(null);
    }
  };

  const cancelDeleteComment = () => {
    setShowConfirmDialog(false);
    setCommentToDelete(null);
  };

  // Check if current user owns the comment
  const isCommentOwner = (comment) => {
    return currentUser && comment.user && currentUser.id === comment.user.id;
  };

  // Format timestamp for display
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return "now";
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleReportComment = (comment) => {
    setReportingComment({
      ...comment,
      displayText: `Comment by ${comment.user?.name || 'Unknown'}`
    });
    setShowReportModal(true);
  };

  const handleSubmitReport = async (reportData) => {
    try {
      await reportAPI.reportComment(reportingComment.id, {
        reason: reportData.reason,
        reason_type: reportData.reasonType
      });
      setShowReportModal(false);
      setReportingComment(null);
      toast.success("Comment reported successfully!");
    } catch (error) {
      console.error('Failed to report comment:', error);
      toast.error("Failed to report comment. Please try again.");
      throw error;
    }
  };

  const handleCloseReportModal = () => {
    setShowReportModal(false);
    setReportingComment(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col animate-in slide-in-from-bottom-full duration-300">
      {/* Header */}
      <div className="flex-shrink-0 bg-background/80 backdrop-blur-lg border-b border-border p-4 animate-in slide-in-from-top duration-300">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex-1">
            <h2 className="text-lg font-semibold">Comments</h2>
            <p className="text-sm text-muted-foreground truncate">{portfolioTitle}</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="hover:bg-purple-100 dark:hover:bg-purple-900/20">
            <X className="size-5" />
          </Button>
        </div>
      </div>

      {/* Comment input */}
      <div className="flex-shrink-0 bg-background/80 backdrop-blur-lg border-b border-border p-4 animate-in slide-in-from-top duration-300">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleAddComment} className="flex space-x-2">
            <Input
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
              disabled={addingComment}
            />
            <Button 
              type="submit" 
              disabled={!newComment.trim() || addingComment}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {addingComment ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
            </Button>
          </form>
        </div>
      </div>

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {comments.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
              </div>
            </div>
          ) : (
            comments.map((comment, index) => (
              <Card 
                key={comment.id} 
                className="border-purple-100 dark:border-purple-900/20 animate-in slide-in-from-bottom duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-4">
                  <div className="flex space-x-3">
                    <Avatar className="size-10">
                      <AvatarImage src={getProfileImageUrl(comment.user?.profile_picture)} />
                      <AvatarFallback>{comment.user?.name?.[0] || 'U'}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{comment.user?.name || 'Unknown User'}</span>
                        <span className="text-xs text-muted-foreground">{formatTimestamp(comment.created_at)}</span>
                      </div>
                      <p className="text-sm mb-3 text-muted-foreground">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        {isCommentOwner(comment) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteComment(comment.id)}
                            disabled={deletingCommentId === comment.id}
                            className="text-xs h-auto p-1 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600"
                          >
                            {deletingCommentId === comment.id ? (
                              <Loader2 className="size-3 mr-1 animate-spin" />
                            ) : (
                              <Trash2 className="size-3 mr-1" />
                            )}
                            Delete
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReportComment(comment)}
                          className="text-xs h-auto p-1 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600"
                        >
                          <Flag className="size-3 mr-1" />
                          Report
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showConfirmDialog}
        onClose={cancelDeleteComment}
        onConfirm={confirmDeleteComment}
        title="Delete Comment"
        message="Are you sure you want to delete this comment? This action cannot be undone."
      />

      {/* Report Modal */}
      {reportingComment && (
        <ReportModal
          isOpen={showReportModal}
          onClose={handleCloseReportModal}
          portfolioId={reportingComment.id}
          portfolioTitle={reportingComment.displayText}
          onSubmit={handleSubmitReport}
        />
      )}
    </div>
  );
};

export default CommentsModal;
