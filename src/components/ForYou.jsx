import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Users, Sparkles } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import { Link, useNavigate } from "react-router-dom";
import { getForYouPortfoliosThunk } from "@/store/forYou/thunk/getForYouPortfoliosThunk";
import Cookies from "js-cookie";

const ForYou = ({ className }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, portfolios, error } = useSelector((state) => state.forYou);
  const [visibleItems, setVisibleItems] = useState([]);
  const isAuthenticated = !!Cookies.get("token");
  
  // Call API only if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getForYouPortfoliosThunk());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    if (portfolios.length > 0) {
      // Show only first 4 portfolios and animate them appearing one by one
      const uniquePortfolios = portfolios.slice(0, 4).filter((portfolio, index, self) => 
        index === self.findIndex(p => p.id === portfolio.id)
      );
      setVisibleItems([]);
      
      const timer = setTimeout(() => {
        const loadItems = async () => {
          for (let i = 0; i < uniquePortfolios.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 300));
            setVisibleItems(prev => [...prev, uniquePortfolios[i]]);
          }
        };
        
        loadItems();
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [portfolios]);

  return (
    <section className={`py-16 bg-gradient-to-br from-gray-50/80 to-purple-50/60 dark:bg-gradient-to-br dark:from-background dark:to-purple-900/15 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">For You</span>
          </h2>
          <Link to="/for-you">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20">
              View All
            </Button>
          </Link>
        </div>

        {!isAuthenticated ? (
          <div className="text-center py-12 px-6">
            <div className="max-w-md mx-auto">
              <div className="mb-6">
                <Sparkles className="w-16 h-16 mx-auto text-purple-500 mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">Personalized Just for You</h3>
                <p className="text-muted-foreground mb-6">
                  Discover amazing portfolios tailored to your interests. Sign in to get personalized recommendations based on your activity and preferences.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-sm">
                <div className="flex items-center justify-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Heart className="w-4 h-4 text-purple-600" />
                  <span>Based on your likes</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span>From creators you follow</span>
                </div>
                <div className="flex items-center justify-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>AI-powered suggestions</span>
                </div>
              </div>
              <div className="space-y-3">
                <Button 
                  onClick={() => navigate('/signin')} 
                  className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                >
                  Sign In to Get Recommendations
                </Button>
                <p className="text-sm text-muted-foreground">
                  Don't have an account? <button onClick={() => navigate('/signup')} className="text-purple-600 hover:text-purple-700 font-medium">Sign up for free</button>
                </p>
              </div>
            </div>
          </div>
        ) : loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-muted rounded-lg h-48 mb-4"></div>
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Unable to load recommendations</p>
          </div>
        ) : visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleItems.map((portfolio, index) => (
              <PortfolioCard
                key={`foryou-${portfolio.id}-${index}`}
                portfolio={portfolio}

              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">No recommendations available yet</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForYou;
