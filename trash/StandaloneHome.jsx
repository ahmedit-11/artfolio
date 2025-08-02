
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import FeaturedCategories from "@/components/FeaturedCategories";
import TrendingPortfolios from "@/components/TrendingPortfolios";
import ForYou from "@/components/ForYou";
import Following from "@/components/Following";
import CallToAction from "@/components/CallToAction";

const StandaloneHome = () => {
  // This is a standalone version of the home page without React Router
  return (
    <div className="flex flex-col min-h-screen">
      {/* Modified Header without router links */}
      <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto sm:px-6">
          <div className="flex items-center space-x-2">
            <div className="size-8 rounded-full bg-purple-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl hidden sm:block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800 font-quicksand">
              Purplefolio
            </span>
          </div>

          {/* Desktop Navigation - without router links */}
          <nav className="hidden md:flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors font-quicksand">
              <span className="size-4">🏠</span>
              <span>Home</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors font-quicksand">
              <span className="size-4">👥</span>
              <span>Following</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors font-quicksand">
              <span className="size-4">🧭</span>
              <span>For You</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors font-quicksand">
              <span className="size-4">📈</span>
              <span>Trending</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors font-quicksand">
              <span className="size-4">🖼️</span>
              <span>Explore</span>
            </button>
            <button className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors font-quicksand">
              <span className="size-4">✉️</span>
              <span>Contact</span>
            </button>
          </nav>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
              Sign Up
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <Hero />
        <FeaturedCategories />
        <Following />
        <ForYou />
        <TrendingPortfolios />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
};

export default StandaloneHome;
