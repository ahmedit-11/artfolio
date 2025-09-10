import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";
import { useScrollToTop } from "../utils/scrollToTop";
import PageTitle from "@/components/PageTitle";
import { getForYouPortfoliosThunk } from "@/store/forYou/thunk/getForYouPortfoliosThunk";
import { getRatingsThunk } from "@/store/ratings/thunk/getRatingsThunk";

const ForYouPage = () => {
  useScrollToTop();
  const dispatch = useDispatch();
  const { loading, portfolios, error } = useSelector((state) => state.forYou);

  useEffect(() => {
    dispatch(getForYouPortfoliosThunk());
  }, [dispatch]);

  useEffect(() => {
    if (portfolios && portfolios.length > 0) {
      portfolios.forEach((portfolio) => {
        if (portfolio.slug) {
          dispatch(getRatingsThunk(portfolio.slug));
        }
      });
    }
  }, [portfolios, dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Discover personalized portfolio recommendations tailored to your interests and preferences.">
              For You
            </PageTitle>
            {loading ? (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="bg-muted rounded-lg h-48 mb-4"></div>
                    <div className="h-4 bg-muted rounded mb-2"></div>
                    <div className="h-3 bg-muted rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  Failed to load personalized recommendations. Please try again later.
                </p>
              </div>
            ) : portfolios.length === 0 ? (
              <div className="mt-8 text-center">
                <p className="text-muted-foreground">
                  No personalized recommendations available yet. Start liking and rating portfolios to get better suggestions!
                </p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animation-delay-300">
                {portfolios.map((portfolio, index) => (
                  <PortfolioCard
                    key={portfolio.id}
                    portfolio={portfolio}
                    style={{ animationDelay: `${600 + (index * 200)}ms` }}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForYouPage;