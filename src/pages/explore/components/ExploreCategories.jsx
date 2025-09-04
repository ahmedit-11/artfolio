import React from "react";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Web Design",
    slug: "web-design",
    description: "UI/UX, graphic design, illustrations, and more",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5",
  },
  {
    name: "Mobile Apps",
    slug: "mobile-apps",
    description: "Web, mobile, and software development projects",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  },
  {
    name: "Photography",
    slug: "photography",
    description: "Photography portfolios and visual stories",
    image: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e",
  },
  {
    name: "Branding",
    slug: "branding",
    description: "Digital art, paintings, sculptures, and traditional media",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5",
  },
];

const ExploreCategories = () => {
  return (
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Link key={category.name} to={`/category/${category.slug}`}>
          <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20 cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img
                src={`${category.image}?auto=format&fit=crop&w=800&q=80`}
                alt={category.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent dark:from-black/80 dark:to-transparent transition-all duration-300" />
              <div className="absolute bottom-0 left-0 p-4">
                <h3 className="text-xl font-bold text-white mb-2">{category.name}</h3>
                <p className="text-white/80 text-sm line-clamp-2">{category.description}</p>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

export default ExploreCategories;
