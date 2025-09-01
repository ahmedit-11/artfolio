import React from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";
import PageTitle from "@/components/PageTitle";

const portfolios = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
    title: "Minimalist UI Design Collection",
    creator: "Alex Johnson",
    creatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
    likes: 248,
    comments: 36,
    tags: ["UI/UX", "Minimalism"],
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    title: "Abstract Digital Art Series",
    creator: "Maya Patel",
    creatorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
    likes: 192,
    comments: 24,
    tags: ["Digital Art", "Abstract"],
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&w=800&q=80",
    title: "Brand Identity for Tech Startup",
    creator: "Daniel Lee",
    creatorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
    likes: 324,
    comments: 41,
    tags: ["Branding", "Logo Design"],
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=800&q=80",
    title: "3D Character Animation Reel",
    creator: "Sophie Garcia",
    creatorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    likes: 176,
    comments: 19,
    tags: ["3D", "Animation"],
  },
];

const TrendingPage = () => {
  useScrollToTop();
  return (
    <div className="flex flex-col min-h-screen bg-background bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Explore the most popular and trending portfolios that are making waves in the creative community.">
              Trending Now
            </PageTitle>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animation-delay-300">
              {portfolios.map((portfolio, index) => (
                <PortfolioCard
                  key={portfolio.id}
                  className="transition-all duration-500 hover:shadow-lg hover:-translate-y-3 hover:scale-105 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20 animate-fade-in"
                  style={{ animationDelay: `${600 + (index * 200)}ms` }}
                  image={portfolio.image}
                  title={portfolio.title}
                  creator={portfolio.creator}
                  creatorImage={portfolio.creatorImage}
                  likes={portfolio.likes}
                  comments={portfolio.comments}
                  tags={portfolio.tags}
                />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TrendingPage; 