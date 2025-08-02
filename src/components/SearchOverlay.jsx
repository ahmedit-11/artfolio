// SearchOverlay.jsx
// A floating overlay that drops from the top when the header search icon is clicked.
// Displays a SearchBar that syncs with global SearchContext.
import React, { useEffect } from "react";
import { useSearch } from "@/contexts/SearchContext";
import { X } from "lucide-react";
import SearchBar from "./SearchBar";
import { useLocation } from "react-router-dom";


const SearchOverlay = () => {
  const location = useLocation();
    const { isOpen, toggleOpen, closeOverlay } = useSearch();

  // close overlay on route change
  useEffect(() => {
    closeOverlay();
  }, [location.pathname]);

  return (
    isOpen && (
        <div
          className={`fixed top-16 inset-x-0 z-50 bg-background/95 backdrop-blur border-b border-border p-4 shadow-lg rounded-b-lg transition-all duration-300 transform ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-6 pointer-events-none'}`}
          style={{ willChange: 'opacity, transform' }}
        >
          <div className="container flex items-center gap-3">
            <SearchBar className="flex-1" placeholder="Search..." />
            <button
              onClick={toggleOpen}
              className="p-2 rounded-md hover:bg-muted/50 transition-colors"
              aria-label="Close search"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>
    )
  );
};

export default SearchOverlay;
