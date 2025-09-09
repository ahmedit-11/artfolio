import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScrollToTop } from "../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";
import { useSearch, localSearch } from "@/contexts/SearchContext";
import PageTitle from "@/components/PageTitle";
import { getCurrentUserThunk } from "@/store/currentUser/thunk/getCurrentUserThunk";
import { Button } from "@/components/ui/button";
import { Users, Heart } from "lucide-react";
import axios from "axios";

const FollowingPage = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { query } = useSearch();
  
  const { currentUser } = useSelector(state => state.currentUser);
  const [followingPortfolios, setFollowingPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  // Fetch portfolios from followed users
  useEffect(() => {
    const fetchFollowingPortfolios = async () => {
      if (!currentUser?.following || !Array.isArray(currentUser.following) || currentUser.following.length === 0) {
        setFollowingPortfolios([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const portfolioPromises = currentUser.following.map(user => 
          axios.get(`/users/${user.id}/projects`).catch(err => {
            console.warn(`Failed to fetch projects for user ${user.id}:`, err);
            return { data: { projects: [] } };
          })
        );
        
        const responses = await Promise.all(portfolioPromises);
        const allPortfolios = responses.flatMap(response => 
          response.data.projects || []
        );
        
        setFollowingPortfolios(allPortfolios);
      } catch (error) {
        console.error('Error fetching following portfolios:', error);
        setFollowingPortfolios([]);
      } finally {
        setLoading(false);
      }
    };

    // Add a small delay to ensure currentUser is fully updated after follow/unfollow
    const timeoutId = setTimeout(fetchFollowingPortfolios, 100);
    return () => clearTimeout(timeoutId);
  }, [currentUser?.following]);

  const filtered = followingPortfolios.length > 0 ? localSearch(followingPortfolios, query) : [];

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="animate-pulse">
          <div className="bg-muted rounded-lg h-48 mb-4"></div>
          <div className="space-y-2">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Empty state
  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Users className="w-12 h-12 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No portfolios from followed users</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        Start following creators to see their amazing work here!
      </p>
      <Button 
        onClick={() => window.location.href = '/explore'} 
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <Heart className="w-4 h-4 mr-2" />
        Discover Creators
      </Button>
    </div>
  );
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Stay updated with your favorite creators and their latest portfolio updates.">
              Following
            </PageTitle>
            <div className="mt-8">
              {loading ? (
                <LoadingSkeleton />
              ) : followingPortfolios.length === 0 ? (
                <EmptyState />
              ) : filtered.length === 0 && query ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">
                    No portfolios found matching "{query}"
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animation-delay-300">
                  {filtered.map((portfolio, index) => (
                    <PortfolioCard
                      key={portfolio.id}
                      portfolio={portfolio}
                      className="transition-all duration-500 hover:shadow-lg hover:-translate-y-3 hover:scale-105 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20 animate-fade-in"
                      style={{ animationDelay: `${600 + (index * 200)}ms` }}
                    />
                  ))}
                </div>
              )}
            </div>
            
            {!loading && followingPortfolios.length > 0 && (
              <div className="mt-8 text-center text-sm text-muted-foreground">
                Showing {filtered.length} of {followingPortfolios.length} portfolios
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FollowingPage; 