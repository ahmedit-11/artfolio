import React from 'react';

const PageTitle = ({ children, subtitle, className = "" }) => {
  return (
    <div className={`max-w-2xl ${className}`}>
      <h1 className="text-3xl font-bold font-quicksand mb-3">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
          {children}
        </span>
      </h1>
      {subtitle && (
        <p className="text-muted-foreground font-quicksand">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageTitle;
