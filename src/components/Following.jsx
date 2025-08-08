// Following.jsx
// Displays a section of portfolio items that the user is following, with a title, view all button, and a grid of portfolio cards.
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import PortfolioCard from "./PortfolioCard";

// Following component renders a section of portfolio items with interactive features
const Following = ({ 
  className, 
  title = "Following",
  viewAllText = "View All",
  onViewAllClick = () => {},
  onItemClick = () => {},
  onCreatorClick = () => {},
  onLikeClick = () => {},
  onCommentClick = () => {},
  onTagClick = () => {},
  items = [
    {
      id: 1,
      title: "Minimalist UI Design Collection",
      creator: "Alex Johnson",
      creatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=800&q=80",
      likes: 248,
      comments: 36,
      tags: ["UI/UX", "Minimalism"],
    },
    {
      id: 2,
      title: "Abstract Digital Art Series",
      creator: "Maya Patel",
      creatorImage: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      likes: 192,
      comments: 24,
      tags: ["Digital Art", "Abstract"],
    },
    {
      id: 3,
      title: "Brand Identity for Tech Startup",
      creator: "Daniel Lee",
      creatorImage: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1618556450991-2f1af64e8191?auto=format&fit=crop&w=800&q=80",
      likes: 324,
      comments: 41,
      tags: ["Branding", "Logo Design"],
    },
    {
      id: 4,
      title: "3D Character Animation Reel",
      creator: "Sophie Garcia",
      creatorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?auto=format&fit=crop&w=800&q=80",
      likes: 176,
      comments: 19,
      tags: ["3D", "Animation"],
    },
  ]
}) => {
  return (
    <section className={`py-16 bg-gradient-to-br from-slate-200/50  to-purple-200/50 dark:bg-gradient-to-br dark:from-purple-900/15 dark:via-indigo-900/20 dark:to-background ${className || ''}`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">{title}</span>
          </h2>
          <Button 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex items-center"
            onClick={onViewAllClick}
          >
            {viewAllText} <ChevronRight className="ml-1 size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 bg-secondary\/50">
          {items.map((item) => (
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
              onCardClick={() => onItemClick(item)}
              onCreatorClick={() => onCreatorClick(item.creator)}
              onLikeClick={() => onLikeClick(item)}
              onCommentClick={() => onCommentClick(item)}
              onTagClick={(tag) => onTagClick(tag, item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Following;