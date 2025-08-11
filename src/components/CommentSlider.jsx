// CommentSlider.jsx
// Displays a sliding panel for viewing a comment and its replies, with an input for adding new replies.
import React from 'react';
import { X } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

// CommentSlider component renders a sliding panel for a comment and its replies
const CommentSlider = ({ comment, onClose }) => {
  if (!comment) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-40 transition-opacity"
        onClick={onClose}
      />
      {/* Slider panel */}
      <div
        className="relative bg-white dark:bg-zinc-900 w-full sm:w-1/2 h-full ml-auto shadow-xl transition-transform duration-300 flex flex-col"
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover:bg-zinc-600"
          onClick={onClose}
          aria-label="Close comments"
        >
          <X className="w-5 h-5" />
        </button>
        {/* Main comment */}
        <div className="p-6 border-b border-zinc-200 dark:border-zinc-700 flex items-start space-x-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
            <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">{comment.user.name}</span>
              <span className="text-xs text-zinc-400">{comment.timestamp}</span>
            </div>
            <p className="mt-2 text-base">{comment.text}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-zinc-500">
              <span>👍 {comment.likes}</span>
              <span>Reply</span>
            </div>
          </div>
        </div>
        {/* Replies */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {comment.replies && comment.replies.length > 0 ? (
            comment.replies.map((reply) => (
              <div key={reply.id} className="flex items-start space-x-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={reply.user.avatar} alt={reply.user.name} />
                  <AvatarFallback>{reply.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{reply.user.name}</span>
                    <span className="text-xs text-zinc-400">{reply.timestamp}</span>
                  </div>
                  <p className="text-sm mt-1">{reply.text}</p>
                  <div className="flex items-center space-x-4 mt-1 text-xs text-zinc-500">
                    <span>👍 {reply.likes}</span>
                    <span>Reply</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-zinc-400 text-sm">No replies yet.</div>
          )}
        </div>
        {/* New reply input */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-700 flex items-center space-x-2">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://randomuser.me/api/portraits/men/4.jpg" alt="Your avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <input
            type="text"
            placeholder="Write a reply..."
            className="flex-1 px-3 py-2 rounded-full border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-sm"
          />
          <button className="px-3 py-1 bg-purple-600 text-white rounded-full text-sm hover:bg-purple-700 transition">Reply</button>
        </div>
      </div>
    </div>
  );
};

export default CommentSlider; 