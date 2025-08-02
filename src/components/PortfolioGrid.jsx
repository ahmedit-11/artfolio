// PortfolioGrid.jsx
// Displays a grid of portfolio items with filtering and sorting options, including a search bar, category filter, and sort dropdown.
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, SlidersHorizontal } from "lucide-react";
import PortfolioCard from "./PortfolioCard";

// PortfolioGrid component renders a grid of portfolio items with filtering and sorting options
const PortfolioGrid = ({
  className,
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
    {
      id: 5,
      title: "Photography Portfolio",
      creator: "James Wilson",
      creatorImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80",
      likes: 432,
      comments: 56,
      tags: ["Photography", "Nature"],
    },
    {
      id: 6,
      title: "Illustration Series",
      creator: "Emma Thompson",
      creatorImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=800&q=80",
      likes: 289,
      comments: 31,
      tags: ["Illustration", "Digital Art"],
    },
    {
      id: 7,
      title: "Web Design Project",
      creator: "Michael Brown",
      creatorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800&q=80",
      likes: 156,
      comments: 23,
      tags: ["Web Design", "UI/UX"],
    },
    {
      id: 8,
      title: "Motion Graphics Showreel",
      creator: "Olivia Martinez",
      creatorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&w=800&q=80",
      likes: 198,
      comments: 27,
      tags: ["Motion Graphics", "Animation"],
    },
  ],
  onItemClick = () => {},
  onCreatorClick = () => {},
  onCommentClick = () => {},
  onTagClick = () => {},
}) => {
  // State for search query, selected category, and sort option
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("recent");

  // Filter items based on search query and selected category
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === "all" || item.tags.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  // Sort items based on selected sort option
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOption) {
      case "likes":
        return b.likes - a.likes;
      case "comments":
        return b.comments - a.comments;
      case "recent":
      default:
        return b.id - a.id;
    }
  });

  // Get unique categories from all items
  const categories = ["all", ...new Set(items.flatMap((item) => item.tags))];

  return (
    <div className={`space-y-6 ${className || ''}`}>
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search portfolios..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 size-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SlidersHorizontal className="mr-2 size-4" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="likes">Most Liked</SelectItem>
              <SelectItem value="comments">Most Commented</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sortedItems.map((item) => (
          <PortfolioCard
            key={item.id}
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
            onCommentClick={() => onCommentClick(item)}
            onTagClick={(tag) => onTagClick(tag, item)}
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioGrid; 