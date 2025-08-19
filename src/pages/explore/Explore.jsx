import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import ExploreCategories from "./components/ExploreCategories";

const ExplorePage = () => {
  useScrollToTop();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Discover creative categories and find inspiration from a variety of portfolios.">
              Explore Categories
            </PageTitle>
            <ExploreCategories />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage;
