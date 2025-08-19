// Search.jsx
// Dedicated search page with history, popular searches, and filters.
import React, { useState, useEffect } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { useSearch } from "@/contexts/SearchContext";
import SearchResults from "@/components/SearchResults";
import SearchView from "./components/SearchView";

const SearchPage = () => {
  useScrollToTop();
  const { query, setQuery } = useSearch();
  const [scope, setScope] = useState("all"); // all | following
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("searchHistory") || "[]"));
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Clear query when leaving page
  useEffect(() => {
    return () => setQuery("");
  }, [setQuery]);

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
        <SearchView 
          scope={scope}
          setScope={setScope}
          history={history}
          query={query}
          setQuery={setQuery}
          results={results}
          setResults={setResults}
          loading={loading}
          setLoading={setLoading}
        />
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;
