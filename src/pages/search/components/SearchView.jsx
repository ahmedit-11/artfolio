import React, { useEffect } from "react";
import { localSearch } from "@/contexts/SearchContext";
import SearchResults from "@/components/SearchResults";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import portfolios from "@/data/portfolios";

// Mock popular searches
const popularTerms = ["UI/UX", "3D", "Illustration", "Photography"];

const SearchView = ({ 
  scope, 
  setScope, 
  history, 
  query, 
  setQuery, 
  results, 
  setResults, 
  loading, 
  setLoading 
}) => {
  // Execute search when query changes automatically (>=3 chars) or submitted
  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 3) {
      setResults([]);
      return;
    }
    setLoading(true);
    const t = setTimeout(() => {
      const res = scope === "following" ? localSearch(portfolios, trimmed) : localSearch(portfolios, trimmed);
      setResults(res);
      setLoading(false);
    }, 300);
    return () => clearTimeout(t);
  }, [query, scope, setResults, setLoading]);

  return (
    <>
      {/* Filters */}
      <div className="flex gap-2">
        {[
          { key: "all", label: "All" },
          { key: "following", label: "Following" },
        ].map((f) => (
          <Button
            key={f.key}
            size="sm"
            variant={scope === f.key ? "default" : "outline"}
            onClick={() => setScope(f.key)}
          >
            {f.label}
          </Button>
        ))}
      </div>

      {/* Popular & history */}
      <section className="space-y-4">
        <div>
          <h2 className="font-semibold mb-2">Popular searches</h2>
          <div className="flex flex-wrap gap-2">
            {popularTerms.map((term) => (
              <Button key={term} size="sm" variant="secondary" onClick={() => setQuery(term)}>
                {term}
              </Button>
            ))}
          </div>
        </div>
        {history.length > 0 && (
          <div>
            <h2 className="font-semibold mb-2">Recent searches</h2>
            <div className="flex flex-wrap gap-2">
              {history.map((h) => (
                <Button key={h} size="sm" variant="ghost" onClick={() => setQuery(h)}>
                  {h}
                </Button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Loader */}
      {loading && (
        <div className="flex justify-center py-10 animate-fade-in">
          <Loader2 className="size-6 animate-spin" />
        </div>
      )}
      
      {/* Results */}
      {!loading && query.trim().length === 0 && (
        <p className="text-center text-muted-foreground py-10 animate-fade-in">Start typing to search...</p>
      )}
      {!loading && query.trim().length >= 3 && (
        results.length > 0 ? (
          <div className="animate-fade-in">
            <SearchResults results={results} showSearchInput={false} />
          </div>
        ) : (
          <p className="text-center py-10 animate-fade-in">No results found.</p>
        )
      )}
    </>
  );
};

export default SearchView;
