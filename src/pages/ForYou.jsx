import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";

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

const ForYouPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-3xl font-bold font-quicksand mb-3">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
                  For You
                </span>
              </h1>
              <p className="text-muted-foreground font-quicksand">
                Discover personalized portfolio recommendations tailored to your interests and preferences.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {forYouItems.map((item) => (
                <PortfolioCard
                  key={item.id}
                  image={item.image}
                  title={item.title}
                  creator={item.creator}
                  creatorImage={item.creatorImage}
                  likes={item.likes}
                  comments={item.comments}
                  tags={item.tags}
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

export default ForYouPage; 