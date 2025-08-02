
import React from "react";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PortfolioCard from "@/components/PortfolioCard";

const categories = ["All", "Design", "Development", "Photography", "Art", "3D", "Music", "Writing"];

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
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&w=800&q=80",
    title: "Modern Photography Portfolio",
    creator: "James Wilson",
    creatorImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80",
    likes: 134,
    comments: 27,
    tags: ["Photography", "Portrait"],
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=800&q=80",
    title: "UI Components Library",
    creator: "Olivia Chen",
    creatorImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=100&q=80",
    likes: 287,
    comments: 53,
    tags: ["UI/UX", "Components"],
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698?auto=format&fit=crop&w=800&q=80",
    title: "Mobile App UI Design",
    creator: "Marcus Kim",
    creatorImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
    likes: 215,
    comments: 32,
    tags: ["Mobile", "UI/UX"],
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?auto=format&fit=crop&w=800&q=80",
    title: "Icon Design Collection",
    creator: "Priya Sharma",
    creatorImage: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80",
    likes: 167,
    comments: 21,
    tags: ["Icons", "Design"],
  },
];

const Explore = () => {
  const [activeCategory, setActiveCategory] = React.useState("All");

  return (
    <>
      <Header />
      <main>
        <section className="pt-8 pb-16">
          <div className="container px-4 mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-6">Explore Portfolios</h1>
              <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-5" />
                <Input
                  type="search"
                  placeholder="Search portfolios, creators, or tags..."
                  className="pl-10 py-6"
                />
              </div>
              <div className="flex flex-nowrap overflow-x-auto gap-2 pb-3 hide-scrollbar">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    className={activeCategory === category ? "bg-purple-gradient hover:opacity-90" : ""}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {portfolios.map((portfolio) => (
                <PortfolioCard
                  key={portfolio.id}
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

            <div className="flex justify-center mt-12">
              <Button variant="outline" size="lg">
                Load More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Explore;
