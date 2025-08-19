import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import { Palette, Users, Search, Shield, Zap, Heart } from "lucide-react";

const features = [
  {
    icon: Palette,
    title: "Creative Portfolio Builder",
    description: "Build stunning portfolios with our intuitive drag-and-drop interface. Showcase your work with customizable layouts and themes."
  },
  {
    icon: Users,
    title: "Community & Networking",
    description: "Connect with fellow creatives, follow your favorite artists, and build meaningful professional relationships."
  },
  {
    icon: Search,
    title: "Advanced Discovery",
    description: "Find inspiration through our powerful search and filtering system. Discover portfolios by category, style, or skill level."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your work is protected with enterprise-grade security. Control who sees your portfolio with flexible privacy settings."
  },
  {
    icon: Zap,
    title: "Fast & Responsive",
    description: "Lightning-fast loading times and mobile-optimized design ensure your portfolio looks great on any device."
  },
  {
    icon: Heart,
    title: "Engagement Tools",
    description: "Get feedback through likes, comments, and ratings. Track your portfolio's performance with detailed analytics."
  }
];

const FeaturesPage = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto max-w-6xl">
            <PageTitle subtitle="Discover all the powerful features that make ArtFolio the perfect platform for creative professionals.">
              Platform Features
            </PageTitle>
            
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:shadow-purple-200/40 dark:hover:shadow-purple-900/20">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white mr-4">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="mt-16">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Ready to showcase your creativity?
                </h2>
                <p className="text-muted-foreground text-lg mb-6 max-w-2xl mx-auto">
                  Join thousands of creative professionals who trust ArtFolio to showcase their work and connect with opportunities.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    Get Started Free
                  </button>
                  <button className="px-8 py-3 border border-border text-foreground rounded-lg font-semibold hover:bg-secondary transition-all duration-300">
                    View Examples
                  </button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
