
import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrendingPortfolios from "@/components/TrendingPortfolios";

const TrendingPage = () => {
  return (
    <>
      <Helmet>
        <title>Trending Now | Purplefolio</title>
        <meta name="description" content="Discover the most popular and trending portfolios on Purplefolio" />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
            <div className="container px-4 mx-auto">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold font-quicksand mb-3">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
                    Trending Now
                  </span>
                </h1>
                <p className="text-muted-foreground font-quicksand">
                  Explore the most popular and trending portfolios that are making waves in the creative community.
                </p>
              </div>
              <div className="mt-8">
                <TrendingPortfolios />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default TrendingPage;
