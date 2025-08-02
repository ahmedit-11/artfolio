import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import { Link } from "react-router-dom";

const forYouItems = [
  {
    id: 1,
    title: "Digital Art Portfolio",
    creator: "Sophia Lin",
    creatorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=800&q=80",
    likes: 127,
    comments: 24,
    tags: ["Digital Art", "Illustration"],
  },
  {
    id: 2,
    title: "Web Design Collection",
    creator: "Marcus Johnson",
    creatorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    likes: 85,
    comments: 16,
    tags: ["Web Design", "UI/UX"],
  },
  {
    id: 3,
    title: "Photography Series: Urban Exploration",
    creator: "Elena Rodriguez",
    creatorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    likes: 184,
    comments: 32,
    tags: ["Photography", "Urban"],
  },
  {
    id: 4,
    title: "3D Character Design Portfolio",
    creator: "Alex Zhang",
    creatorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
    image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&w=800&q=80",
    likes: 93,
    comments: 18,
    tags: ["3D Design", "Character"],
  }
];

const ForYou = ({ className }) => {
  const [visibleItems, setVisibleItems] = useState([]);
  
  useEffect(() => {
    // Animate items appearing one by one
    const timer = setTimeout(() => {
      const loadItems = async () => {
        for (let i = 0; i < forYouItems.length; i++) {
          await new Promise(resolve => setTimeout(resolve, 300));
          setVisibleItems(prev => [...prev, forYouItems[i]]);
        }
      };
      
      loadItems();
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={`py-16  dark:bg-background from-white to-purple-50 dark:from-background dark:to-purple-900/10 ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">For You</span>
          </h2>
          <Link to="/for-you">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20">
              View All
            </Button>
          </Link>
        </div>

        {visibleItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleItems.map((item) => (
              <PortfolioCard
                key={item.id}
                id={item.id}
                image={item.image}
                title={item.title}
                creator={item.creator}
                creatorImage={item.creatorImage}
                likes={item.likes}
                comments={item.comments}
                tags={item.tags}
                className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground mb-4">Loading personalized recommendations...</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ForYou;
