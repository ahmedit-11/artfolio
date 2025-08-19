import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "../../utils/scrollToTop";
import ForYouContent from "./components/ForYouContent";

const ForYouPage = () => {
  useScrollToTop();
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
            <ForYouContent />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ForYouPage;
