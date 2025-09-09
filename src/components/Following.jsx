// Following.jsx
// Displays a section of portfolio items that the user is following, with a title, view all button, and a grid of portfolio cards.
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import { getCurrentUserThunk } from "@/store/currentUser/thunk/getCurrentUserThunk";
import axios from "axios";

// Following component renders a section of portfolio items with interactive features
const Following = ({ 
  className, 
  title = "Following",
  viewAllText = "View All",
  onViewAllClick = () => {},
  onItemClick = () => {},
  onCreatorClick = () => {},
  onLikeClick = () => {},
  onCommentClick = () => {},
  onTagClick = () => {}
}) => {
  const dispatch = useDispatch();
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
        
        // Sort by creation date and take first 4
        const sortedPortfolios = allPortfolios.sort((a, b) => 
          new Date(b.created_at) - new Date(a.created_at)
        );
        
        setFollowingPortfolios(sortedPortfolios.slice(0, 4));
      } catch (error) {
        console.error('Error fetching following portfolios:', error);
        setFollowingPortfolios([]);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchFollowingPortfolios, 100);
    return () => clearTimeout(timeoutId);
  }, [currentUser?.following]);
  return (
    <section className={`py-16 bg-gradient-to-br from-slate-200/50  to-purple-200/50 dark:bg-gradient-to-br dark:from-purple-900/15 dark:via-indigo-900/20 dark:to-background ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">{title}</span>
          </h2>
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex items-center"
            onClick={onViewAllClick}
          >
            {viewAllText} <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-secondary\/50">
          {loading ? (
            // Loading skeleton
            [...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </div>
              </div>
            ))
          ) : followingPortfolios.length === 0 ? (
            // Empty state
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                Follow some creators to see their latest portfolios here
              </p>
            </div>
          ) : (
            // Real portfolio data
            followingPortfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20"
                onCardClick={() => onItemClick(portfolio)}
                onCreatorClick={() => onCreatorClick(portfolio.user?.name)}
                onLikeClick={() => onLikeClick(portfolio)}
                onCommentClick={() => onCommentClick(portfolio)}
                onTagClick={(tag) => onTagClick(tag, portfolio)}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Following;