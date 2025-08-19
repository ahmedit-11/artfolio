import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import TrendingPortfolios from "./components/TrendingPortfolios";

const TrendingPage = () => {
  useScrollToTop();
  return (
    <div className="flex flex-col min-h-screen bg-background bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 ">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Explore the most popular and trending portfolios that are making waves in the creative community.">
              Trending Now
            </PageTitle>
            <TrendingPortfolios />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrendingPage;
