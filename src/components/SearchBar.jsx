// SearchBar.jsx
// Displays a search input with a search icon and placeholder text, allowing users to search for content.
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useSearch } from "@/contexts/SearchContext";

// SearchBar component renders a search input with a search icon
const SearchBar = ({
  className,
  placeholder = "Search...",
  scope = "all", // "all" | "following"
  onSubmit = () => {},
  autoFocus = false,
}) => {
  const { query, setQuery, isOpen } = useSearch();
  const [input, setInput] = useState(query);
  const inputRef = React.useRef(null);

  // Keep local input in sync when external query changes
  useEffect(() => {
    setInput(query);
  }, [query]);

  // Debounced sync of input to global query (fires on typing or deleting)
  useEffect(() => {
    const t = setTimeout(() => {
      setQuery(input.trim());
    }, 300);
    return () => clearTimeout(t);
  }, [input]);

  // Auto-focus when overlay opens or prop set
  useEffect(() => {
    if ((isOpen || autoFocus) && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen, autoFocus]);

  return (
    <div className={cn("relative flex items-center", className)}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={input}
        onChange={(e) => setInput(e.target.value) }
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onSubmit(input.trim());
          }
        }}
        className="pl-10 pr-28"
      />
      <Button
        size="sm"
        className="absolute right-2 top-1/2 -translate-y-1/2"
        onClick={() => onSubmit(input.trim())}
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar; 