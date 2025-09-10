import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PortfolioCard from "@/components/PortfolioCard";
import { getCategoryPortfoliosThunk } from "@/store/categoryPortfolios/thunk/getCategoryPortfoliosThunk";
import { clearCategoryPortfolios } from "@/store/categoryPortfolios/categoryPortfoliosSlice";
import { getRatingsThunk } from "@/store/ratings/thunk/getRatingsThunk";

const CategoryPage = () => {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { portfolios, category, loading, error } = useSelector(
    (state) => state.categoryPortfolios
  );

  useEffect(() => {
    if (categorySlug) {
      dispatch(getCategoryPortfoliosThunk(categorySlug));
    }
    
    // Cleanup on unmount
    return () => {
      dispatch(clearCategoryPortfolios());
    };
  }, [dispatch, categorySlug]);

  // Fetch ratings for each portfolio when portfolios are loaded
  useEffect(() => {
    if (portfolios && portfolios.length > 0) {
      portfolios.forEach(portfolio => {
        if (portfolio.slug) {
          dispatch(getRatingsThunk(portfolio.slug));
        }
      });
    }
  }, [portfolios, dispatch]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          {/* Header Skeleton */}
          <div className="mb-8">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 mb-4 animate-pulse"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96 animate-pulse"></div>
          </div>
          
          {/* Grid Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="h-48 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                <CardContent className="p-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          
          <div className="text-center py-16">
            <div className="text-red-500 mb-4">
              <Grid className="size-16 mx-auto mb-4 opacity-50" />
              <h2 className="text-2xl font-bold mb-2">Failed to Load Category</h2>
              <p className="text-muted-foreground mb-4">
                {typeof error === 'string' ? error : 'Unable to load portfolios for this category.'}
              </p>
              <Button onClick={() => dispatch(getCategoryPortfoliosThunk(categorySlug))}>
                Try Again
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
          
          <div className="mb-6">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
                {category?.name || categorySlug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
            </h1>
            {category?.description && (
              <p className="text-lg text-muted-foreground max-w-3xl">
                {category.description}
              </p>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-muted-foreground">
              {portfolios?.length || 0} portfolio{portfolios?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Content */}
        {portfolios && portfolios.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolios.map((portfolio) => (
              <PortfolioCard
                key={portfolio.id}
                portfolio={portfolio}
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Grid className="size-16 mx-auto mb-4 text-muted-foreground opacity-50" />
            <h2 className="text-2xl font-bold mb-2 text-muted-foreground">No Portfolios Found</h2>
            <p className="text-muted-foreground mb-6">
              There are no portfolios in this category yet.
            </p>
            <Button onClick={() => navigate('/')} variant="outline">
              Explore Other Categories
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
