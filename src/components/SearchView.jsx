// SearchView.jsx
// Displays a search view with a search bar and search results, allowing users to search for content and view filtered results.
import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";
import { cn } from "@/lib/utils";

// SearchView component renders a search view with a search bar and search results
const SearchView = ({
  className,
  initialQuery = "",
  onSearch = () => {},
  onItemClick = () => {},
  onCreatorClick = () => {},
  onLikeClick = () => {},
  onCommentClick = () => {},
  onTagClick = () => {},
}) => {
  // State for search query
  const [searchQuery, setSearchQuery] = useState(initialQuery);

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className={cn("space-y-6", className)}>
      <SearchBar
        placeholder="Search portfolios..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <SearchResults
        onItemClick={onItemClick}
        onCreatorClick={onCreatorClick}
        onLikeClick={onLikeClick}
        onCommentClick={onCommentClick}
        onTagClick={onTagClick}
      />
    </div>
  );
};

export default SearchView; 