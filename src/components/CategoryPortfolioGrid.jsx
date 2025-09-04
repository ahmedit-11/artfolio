// CategoryPortfolioGrid.jsx
// Simple portfolio grid for category pages without search functionality
import React from "react";
import PortfolioCard from "./PortfolioCard";

const CategoryPortfolioGrid = ({
  portfolios = [],
  viewMode = 'grid',
  onPortfolioClick,
  onCreatorClick,
  onTagClick,
  className = ''
}) => {
  return (
    <div className={`space-y-6 ${className}`}>
      <div className={`grid gap-6 animate-fade-in animation-delay-150 ${
        viewMode === 'list' 
          ? 'grid-cols-1' 
          : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
      }`}>
        {portfolios.map((portfolio, index) => (
          <PortfolioCard
            key={portfolio.id}
            id={portfolio.id}
            image={portfolio.image}
            title={portfolio.title}
            creator={portfolio.creator}
            creatorImage={portfolio.creatorImage}
            likes={portfolio.likes}
            comments={portfolio.comments}
            tags={portfolio.tags}
            rating={portfolio.rating}
            className="transition-all duration-500 hover:shadow-lg hover:-translate-y-3 hover:scale-105 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20 animate-fade-in"
            style={{ animationDelay: `${300 + (index * 150)}ms` }}
            onCardClick={() => onPortfolioClick && onPortfolioClick(portfolio.id)}
            onCreatorClick={() => onCreatorClick && onCreatorClick(portfolio.creator)}
            onTagClick={(tag) => onTagClick && onTagClick(tag)}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPortfolioGrid;
