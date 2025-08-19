import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useSearch } from "@/contexts/SearchContext";
import PageTitle from "@/components/PageTitle";
import FollowingContent from "./components/FollowingContent";

const FollowingPage = () => {
  useScrollToTop();
  const { query } = useSearch();
  
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Stay updated with your favorite creators and their latest portfolio updates.">
              Following
            </PageTitle>
            <FollowingContent searchQuery={query} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FollowingPage;
