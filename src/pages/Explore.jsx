import React from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";

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

const ExplorePage = () => {
  useScrollToTop();
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <PageTitle subtitle="Discover creative categories and find inspiration from a variety of portfolios.">
              Explore Categories
            </PageTitle>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in animation-delay-300">
              {categories.map((category, index) => (
                <Card
                  key={category.name}
                  className="overflow-hidden transition-all duration-500 hover:shadow-lg hover:-translate-y-3 hover:scale-105 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20 animate-fade-in"
                  style={{ animationDelay: `${600 + (index * 200)}ms` }}
                >
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
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ExplorePage; 