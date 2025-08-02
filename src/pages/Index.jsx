import React from "react";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import TrendingPortfolios from "@/components/TrendingPortfolios";
import ForYou from "@/components/ForYou";
import Following from "@/components/Following";
import CallToAction from "@/components/CallToAction";
// import AuthForm from "@/pages/authForm/authForm"

const Index = () => {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <Following 
        title="Following"
        viewAllText="View All"
        onViewAllClick={() => console.log("View all clicked")}
      />
      <ForYou />
      <TrendingPortfolios />
      <CallToAction />
    </>
  );
};

export default Index;
