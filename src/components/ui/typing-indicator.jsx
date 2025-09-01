import React from 'react';

const TypingIndicator = ({ userName, className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 text-gray-600 dark:text-gray-300 text-sm py-2 ${className}`}>
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-gray-600 dark:bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <span className="font-medium">{userName} is typing...</span>
    </div>
  );
};

export default TypingIndicator;
