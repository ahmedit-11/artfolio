// Search.jsx
// Dedicated search page with history, popular searches, and filters.
import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { localSearch, useSearch } from "@/contexts/SearchContext";
import SearchResults from "@/components/SearchResults";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

// Mock popular searches
const popularTerms = ["UI/UX", "3D", "Illustration", "Photography"];

// Mock followed portfolios (same as Following page for demo)
import portfolios from "@/data/portfolios";

const SearchPage = () => {
  const { query, setQuery } = useSearch();
  const [scope, setScope] = useState("all"); // all | following
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("searchHistory") || "[]"));
  const [results, setResults] = useState([]);

  // Clear query when leaving page
  useEffect(() => {
    return () => setQuery("");
  }, [setQuery]);
  const [loading, setLoading] = useState(false);

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
  }, [query, scope]);



  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow container px-4 py-8 space-y-6 animate-fade-in">
        <SearchBar
          className="w-full"
          placeholder="Search portfolios..." autoFocus
          onSubmit={(val) => {
            if (!val) return;
            setQuery(val);
            setHistory((prev) => {
              const updated = [val, ...prev.filter((h) => h !== val)].slice(0, 5);
              localStorage.setItem("searchHistory", JSON.stringify(updated));
              return updated;
            });
          }}
        />
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
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
