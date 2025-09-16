import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useScrollToTop } from "../utils/scrollToTop";

import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import { useSearch } from "@/contexts/SearchContext";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { getProfileImageUrl } from "@/utils/mediaUtils";
import { useInfiniteSearch } from "@/hooks/useInfiniteSearch";
import PortfolioCard from "@/components/PortfolioCard";
import { getAllTagsThunk } from "@/store/tags/thunk/getAllTagsThunk";
import { getRatingsThunk } from "@/store/ratings/thunk/getRatingsThunk";
import Cookies from "js-cookie";

const popularTerms = ["UI/UX", "3D", "Illustration", "Photography"];

const SearchSimple = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { query, setQuery } = useSearch();
  const [scope, setScope] = useState("portfolios");
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("searchHistory") || "[]"));
  const [selectedTag, setSelectedTag] = useState(null);
  
  const userSearch = useInfiniteSearch('users');
  const projectSearch = useInfiniteSearch('projects');
  
  const currentSearch = scope === 'users' ? userSearch : projectSearch;
  const { tags, loading: tagsLoading } = useSelector(state => state.tags);
  const isAuthenticated = !!Cookies.get('token');

  // Fetch available tags using Redux thunk (public endpoint)
  useEffect(() => {
    if (tags.length === 0) {
      dispatch(getAllTagsThunk());
    }
  }, [dispatch, tags.length]);

  // Clear search when scope changes
  useEffect(() => {
    userSearch.clear();
    projectSearch.clear();
    setSelectedTag(null);
  }, [scope]);

  // Search when query or tag changes
  useEffect(() => {
    if (scope === 'users') {
      userSearch.search(query);
    } else {
      projectSearch.search(query, selectedTag?.id);
    }
  }, [query, selectedTag, scope]);

  // Fetch ratings for portfolios (requires authentication)
  useEffect(() => {
    if (currentSearch?.data && currentSearch.data.length > 0 && scope === 'portfolios' && isAuthenticated) {
      currentSearch.data.forEach(portfolio => {
        if (portfolio.slug) {
          dispatch(getRatingsThunk(portfolio.slug));
        }
      });
    }
  }, [currentSearch?.data, scope, dispatch, isAuthenticated]);

  const handleSubmit = (val) => {
    if (!val) return;
    setQuery(val);
    setHistory((prev) => {
      const updated = [val, ...prev.filter((h) => h !== val)].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const handleQuickSearch = (val) => {
    setQuery(val);
    setHistory((prev) => {
      const updated = [val, ...prev.filter((h) => h !== val)].slice(0, 5);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  const handleTagClick = (tag) => {
    if (scope === 'portfolios') {
      setSelectedTag(selectedTag?.id === tag.id ? null : tag);
      setQuery(''); // Clear text search when selecting tag
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
 
      <main className="flex-grow container px-4 py-8 space-y-6">
        <SearchBar
          className="w-full"
          placeholder="Search portfolios..."
          autoFocus
          onSubmit={handleSubmit}
        />

        {/* Scope Tabs */}
        <div className="flex gap-2">
          {[
            { key: "users", label: "Users" },
            { key: "portfolios", label: "Portfolios" },
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

        {/* Tags Section - Available for all users (public endpoint) */}
        {scope === 'portfolios' && tags.length > 0 && (
          <section className="space-y-4">
            <div>
              <h2 className="font-semibold mb-2">Search by tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Button 
                    key={tag.id} 
                    size="sm" 
                    variant={selectedTag?.id === tag.id ? "default" : "secondary"}
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag.name}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Guest user message for additional features */}
        {!isAuthenticated && (
          <section className="space-y-4">
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Sign in</strong> to access personalized features like ratings, comments, and recommendations.
              </p>
            </div>
          </section>
        )}

        {/* Popular & History */}
        <section className="space-y-4">
          <div>
            <h2 className="font-semibold mb-2">Popular searches</h2>
            <div className="flex flex-wrap gap-2">
              {popularTerms.map((term) => (
                <Button key={term} size="sm" variant="secondary" onClick={() => handleQuickSearch(term)}>
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
                  <Button key={h} size="sm" variant="ghost" onClick={() => handleQuickSearch(h)}>
                    {h}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Active Filters */}
        {selectedTag && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Active filter:</span>
            <Button 
              size="sm" 
              variant="outline" 
              onClick={() => setSelectedTag(null)}
            >
              {selectedTag.name} ✕
            </Button>
          </div>
        )}

        {/* Loading */}
        {currentSearch.loading && (
          <div className="flex justify-center py-10">
            <Loader2 className="size-6 animate-spin" />
          </div>
        )}

        {/* Error */}
        {currentSearch.error && (
          <div className="text-center py-10">
            <p className="text-red-500">Error: {currentSearch.error}</p>
          </div>
        )}

        {/* Results */}
        {!currentSearch.loading && query.trim().length === 0 && !selectedTag && (
          <p className="text-center text-muted-foreground py-10">
            Start typing to search or select a tag...
          </p>
        )}

        {!currentSearch.loading && (query.trim().length >= 3 || selectedTag) && (
          <>
            {currentSearch.data.length > 0 ? (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {scope === 'users' ? (
                    currentSearch.data.map((user) => (
                      <div key={user.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)}>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage 
                              src={user.profile_picture ? getProfileImageUrl(user.profile_picture) : null} 
                              alt={user.name}
                            />
                            <AvatarFallback className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                              {user.name?.charAt(0)?.toUpperCase() || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="font-semibold">{user.name}</h3>
                            {user.bio && (
                              <p className="text-sm text-gray-600 mt-1 line-clamp-2">{user.bio}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    currentSearch.data.map((project) => (
                      <PortfolioCard
                        key={project.id}
                        portfolio={project}
                        likes={project.likes_count}
                        comments={project.comments_count}
                        onCreatorClick={() => navigate(`/profile/${project.user.id}`)}
                      />
                    ))
                  )}
                </div>

                {/* Simple Load More Button */}
                {currentSearch.hasMore && (
                  <div className="flex justify-center pt-6">
                    <Button 
                      onClick={currentSearch.loadMore}
                      disabled={currentSearch.loadingMore}
                      variant="outline"
                    >
                      {currentSearch.loadingMore ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Load More'
                      )}
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-center py-10">No {scope} found.</p>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default SearchSimple;
