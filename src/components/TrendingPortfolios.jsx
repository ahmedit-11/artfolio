import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import { Link } from "react-router-dom";

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

const TrendingPortfolios = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-200/50  to-purple-200/50 dark:bg-gradient-to-br dark:from-purple-900/15 dark:via-indigo-900/20 dark:to-background">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">Trending Now</span>
          </h2>
          <Link to="/trending">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex items-center">
              View all <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              id={portfolio.id}
              image={portfolio.image}
              title={portfolio.title}
              creator={portfolio.creator}
              creatorImage={portfolio.creatorImage}
              likes={portfolio.likes}
              comments={portfolio.comments}
              tags={portfolio.tags}
              className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingPortfolios;
