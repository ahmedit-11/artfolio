import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useScrollToTop } from "../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";
import PageTitle from "@/components/PageTitle";
import { getTrendingProjectsThunk } from "@/store/trending/thunk/getTrendingProjectsThunk";
import { TrendingUp } from "lucide-react";

const TrendingPage = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { projects, loading, error } = useSelector(state => state.trending);

  useEffect(() => {
    // Fetch trending projects if not already loaded
    if (!projects.length) {
      dispatch(getTrendingProjectsThunk());
    }
  }, [dispatch, projects.length]);

  return (
    <div className="flex flex-col min-h-screen bg-background bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Explore the most popular and trending portfolios that are making waves in the creative community.">
              Trending Now
            </PageTitle>
            
            {/* Loading State */}
            {loading && !projects.length && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
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
              <div className="mt-8 text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-red-500 mb-4">Failed to load trending projects: {error}</p>
                <button 
                  onClick={() => dispatch(getTrendingProjectsThunk())}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}

            {/* Projects Grid */}
            {!loading && !error && projects.length > 0 && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animation-delay-300">
                {projects.map((project, index) => (
                  <PortfolioCard
                    key={project.id}
                    portfolio={project}
                   
                    style={{ animationDelay: `${600 + (index * 200)}ms` }}
                  />
                ))}
              </div>
            )}

            {/* Empty State */}
            {!loading && !error && projects.length === 0 && (
              <div className="mt-8 text-center py-12">
                <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No trending projects found</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrendingPage; 