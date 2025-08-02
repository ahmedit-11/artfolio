// SearchContext.jsx
// Provides global search state and helper functions.
// In the future, replace the mock search implementation with an API call.
import React, { createContext, useState, useContext } from "react";

// Context shape
const SearchContext = createContext({
  query: "",
  setQuery: () => {},
  isOpen: false,
  toggleOpen: () => {},
  closeOverlay: () => {},
});

export const SearchProvider = ({ children }) => {
    const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);
  const closeOverlay = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <SearchContext.Provider value={{ query, setQuery, isOpen, toggleOpen, closeOverlay }}>
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook for easy access
export const useSearch = () => useContext(SearchContext);

// Helper function to perform client-side search across a data array.
// This should be replaced by a backend/API search in production.
export const localSearch = (items = [], query = "") => {
  if (!query) return items;
  const lower = query.toLowerCase();
  return items.filter(
    (item) =>
      item.title?.toLowerCase().includes(lower) ||
      item.tags?.some((t) => t.toLowerCase().includes(lower))
  );
};
