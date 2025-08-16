import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Heart, Reply, Send, Loader2, Flag, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import ReportModal from "./ReportModal";
import { reportAPI } from "@/lib/api";

// Mock comments data
const mockComments = [
  {
    id: 1,
    author: "John Doe",
    authorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    content: "This is absolutely stunning! The attention to detail is incredible.",
    likes: 12,
    isLiked: false,
    timestamp: "2 hours ago",
    replies: [
      {
        id: 11,
        author: "Jane Smith",
        authorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        content: "I completely agree! The color palette is perfect.",
        likes: 3,
        isLiked: false,
        timestamp: "1 hour ago"
      }
    ]
  },
  {
    id: 2,
    author: "Mike Johnson",
    authorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
    content: "How long did this take to create? The level of craftsmanship is amazing.",
    likes: 8,
    isLiked: false,
    timestamp: "4 hours ago",
    replies: []
  },
  {
    id: 3,
    author: "Sarah Wilson",
    authorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
    content: "This inspires me to push my own creative boundaries. Thank you for sharing!",
    likes: 15,
    isLiked: false,
    timestamp: "6 hours ago",
    replies: []
  }
];

const CommentsModal = ({ isOpen, onClose, portfolioId, portfolioTitle }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingComment, setReportingComment] = useState(null);

  // Simulate loading comments
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setComments(mockComments);
        setIsLoading(false);
      }, 1000); // 1 second delay to show loader

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now(),
      author: "You",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      content: newComment,
      likes: 0,
      isLiked: false,
      timestamp: "now",
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment("");
  };

  const handleAddReply = (commentId) => {
    if (!replyText.trim()) return;

    const reply = {
      id: Date.now(),
      author: "You",
      authorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      content: replyText,
      likes: 0,
      isLiked: false,
      timestamp: "now"
    };

    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, replies: [...comment.replies, reply] }
        : comment
    ));
    
    setReplyText("");
    setReplyTo(null);
  };

  const handleLikeComment = (commentId, isReply = false, parentId = null) => {
    if (isReply && parentId) {
      setComments(comments.map(comment => 
        comment.id === parentId 
          ? {
              ...comment, 
              replies: comment.replies.map(reply => 
                reply.id === commentId 
                  ? { 
                      ...reply, 
                      likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                      isLiked: !reply.isLiked
                    }
                  : reply
              )
            }
          : comment
      ));
    } else {
      setComments(comments.map(comment => 
        comment.id === commentId 
          ? { 
              ...comment, 
              likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
              isLiked: !comment.isLiked
            }
          : comment
      ));
    }
  };

  const handleReportComment = (comment, isReply = false) => {
    setReportingComment({
      ...comment,
      isReply,
      displayText: isReply ? `Reply by ${comment.author}` : `Comment by ${comment.author}`
    });
    setShowReportModal(true);
  };

  const handleSubmitReport = async (reportData) => {
    try {
      await reportAPI.reportComment(reportingComment.id, {
        reason: reportData.reason,
        reason_type: reportData.reasonType
      });
      console.log('Comment reported successfully');
    } catch (error) {
      console.error('Failed to report comment:', error);
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

      {/* Comments list */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <Loader2 className="size-8 animate-spin text-purple-600" />
                <p className="text-muted-foreground">Loading comments...</p>
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
                  {/* Main comment */}
                  <div className="flex space-x-3">
                    <Avatar className="size-10">
                      <AvatarImage src={comment.authorImage} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-sm">{comment.author}</span>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mb-3 text-muted-foreground">{comment.content}</p>
                      <div className="flex items-center space-x-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleLikeComment(comment.id)}
                          className={cn(
                            "text-xs h-auto p-1 hover:bg-purple-100 dark:hover:bg-purple-900/20",
                            comment.isLiked && "text-purple-600"
                          )}
                        >
                          <Heart className={cn("size-3 mr-1", comment.isLiked && "fill-current")} />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setReplyTo(comment.id)}
                          className="text-xs h-auto p-1 hover:bg-purple-100 dark:hover:bg-purple-900/20"
                        >
                          <Reply className="size-3 mr-1" />
                          Reply
                        </Button>
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

                      {/* Reply form */}
                      {replyTo === comment.id && (
                        <div className="mt-3 pl-4 border-l-2 border-purple-200 dark:border-purple-800 animate-in slide-in-from-left duration-200">
                          <div className="flex space-x-2">
                            <Input
                              placeholder="Write a reply..."
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              className="text-sm"
                              onKeyPress={(e) => e.key === 'Enter' && handleAddReply(comment.id)}
                            />
                            <Button
                              size="sm"
                              onClick={() => handleAddReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="bg-purple-600 hover:bg-purple-700"
                            >
                              <Send className="size-3" />
                            </Button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies.length > 0 && (
                        <div className="mt-3 pl-4 border-l-2 border-purple-200 dark:border-purple-800 space-y-3">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex space-x-3 animate-in slide-in-from-left duration-200">
                              <Avatar className="size-8">
                                <AvatarImage src={reply.authorImage} />
                                <AvatarFallback>{reply.author[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-sm">{reply.author}</span>
                                  <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                                </div>
                                <p className="text-sm mb-2 text-muted-foreground">{reply.content}</p>
                                <div className="flex items-center space-x-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleLikeComment(reply.id, true, comment.id)}
                                    className={cn(
                                      "text-xs h-auto p-1 hover:bg-purple-100 dark:hover:bg-purple-900/20",
                                      reply.isLiked && "text-purple-600"
                                    )}
                                  >
                                    <Heart className={cn("size-3 mr-1", reply.isLiked && "fill-current")} />
                                    {reply.likes}
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleReportComment(reply, true)}
                                    className="text-xs h-auto p-1 hover:bg-red-100 dark:hover:bg-red-900/20 hover:text-red-600"
                                  >
                                    <Flag className="size-3 mr-1" />
                                    Report
                                  </Button>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Comment input */}
      <div className="flex-shrink-0 bg-background/80 backdrop-blur-lg border-t border-border p-4 animate-in slide-in-from-bottom duration-300">
        <form onSubmit={handleAddComment} className="max-w-2xl mx-auto">
          <div className="flex space-x-2">
            <Input
              placeholder="Add a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(e)}
            />
            <Button 
              type="submit" 
              disabled={!newComment.trim()}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </div>

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
