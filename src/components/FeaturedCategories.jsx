
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Design",
    description: "UI/UX, graphic design, illustrations, and more",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
  {
    name: "Development",
    description: "Web, mobile, and software development projects",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    name: "Photography",
    description: "Photography portfolios and visual stories",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
  },
  {
    name: "Art",
    description: "Digital art, paintings, sculptures, and traditional media",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
  },
];

const FeaturedCategories = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-50/80 to-purple-50/60 dark:bg-gradient-to-br dark:from-background dark:to-purple-900/15">
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-quicksand text-foreground">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
              Explore Categories
            </span>
          </h2>
          <Link to="/categories">
            <Button variant="ghost" className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/20 flex items-center">
              View all <ChevronRight className="ml-1 size-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={`${category.image}?auto=format&fit=crop&w=800&q=80`}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                  <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
