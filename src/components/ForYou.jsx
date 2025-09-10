import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import { Link } from "react-router-dom";
import { getForYouPortfoliosThunk } from "@/store/forYou/thunk/getForYouPortfoliosThunk";

const ForYou = ({ className }) => {
  const dispatch = useDispatch();
  const { loading, portfolios, error } = useSelector((state) => state.forYou);
  const [visibleItems, setVisibleItems] = useState([]);
  
  // Call API every time component mounts (home screen enter)
  useEffect(() => {
    dispatch(getForYouPortfoliosThunk());
  }, [dispatch]);

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

        {loading ? (
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
