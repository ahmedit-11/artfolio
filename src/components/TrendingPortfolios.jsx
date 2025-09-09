import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import { Link } from "react-router-dom";
import { getTrendingProjectsThunk } from "@/store/trending/thunk/getTrendingProjectsThunk";

const TrendingPortfolios = () => {
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.trending);

  useEffect(() => {
    // Fetch trending projects if not already loaded
    if (!projects.length) {
      dispatch(getTrendingProjectsThunk());
    }
  }, [dispatch, projects.length]);

  // Display only top 4 trending projects
  const topFourProjects = projects.slice(0, 4);

  return (
    <section className="py-16 bg-gradient-to-br from-slate-200/50  to-purple-200/50 dark:bg-gradient-to-br dark:from-purple-900/15 dark:via-indigo-900/20 dark:to-background">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">Trending Now</span>
          </h2>
          <Link to="/trending">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex items-center">
              View all <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>

        {/* Loading State */}
        {loading && !projects.length && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">Failed to load trending projects</p>
            <button 
              onClick={() => dispatch(getTrendingProjectsThunk())}
              className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Projects Grid - Top 4 */}
        {!loading && !error && topFourProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topFourProjects.map((project) => (
              <PortfolioCard
                key={project.id}
                portfolio={project}
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No trending projects available</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingPortfolios;
