import React from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import TrendingPortfolios from "@/components/TrendingPortfolios";
import ForYou from "@/components/ForYou";
import Following from "@/components/Following";
import CallToAction from "@/components/CallToAction";
// import AuthForm from "@/pages/authForm/authForm"

const Index = () => {
  useScrollToTop();
  return (
    <div className="animate-fade-in">
      <div className="animate-fade-in">
        <Hero />
      </div>
      <div className="animate-fade-in animation-delay-300">
        <FeaturedCategories />
      </div>
      <div className="animate-fade-in animation-delay-600">
        <Following 
          title="Following"
          viewAllText="View All"
          onViewAllClick={() => console.log("View all clicked")}
        />
      </div>
      <div className="animate-fade-in animation-delay-900">
        <ForYou />
      </div>
      <div className="animate-fade-in animation-delay-1200">
        <TrendingPortfolios />
      </div>
      <div className="animate-fade-in animation-delay-1500">
        <CallToAction />
      </div>
    </div>
  );
};

export default Index;
