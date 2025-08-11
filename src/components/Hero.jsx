
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-indigo-400/10 to-pink-400/10 dark:from-purple-900/20 dark:via-indigo-900/20 dark:to-pink-900/20"></div>
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-800/40 dark:bg-pink-500/20 rounded-full blur-3xl motion-safe:animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-800/35 dark:bg-indigo-500/20 rounded-full blur-3xl motion-safe:animate-pulse animation-delay-300"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-900/30 dark:bg-pink-300/20 rounded-full blur-3xl motion-safe:animate-pulse animation-delay-150"></div>
      </div>

      <div className="container relative px-4 py-20 mx-auto text-center sm:py-24 md:py-28">
        <div className="animate-fade-in">
          <h1 className="relative text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-6 font-quicksand">
            {/* Subtle blurred glow behind heading */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-40 w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-500/25 via-indigo-500/20 to-pink-500/25 blur-3xl"
            />
            <div className="motion-safe:animate-float-up animation-delay-200">
              <span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-400 to-indigo-500 dark:from-purple-300 dark:via-pink-300 dark:to-indigo-300 bg-[length:300%_100%] motion-safe:animate-gradient-shift drop-shadow-[0_0_18px_rgba(168,85,247,0.35)]"
              >
                Showcase Your Creative Work
              </span>
            </div>
            <div className="motion-safe:animate-float-up animation-delay-500">
              <span
                className="block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-[length:300%_100%] motion-safe:animate-gradient-shift drop-shadow-[0_0_10px_rgba(99,102,241,0.25)]"
              >
                Connect with Other Creatives
              </span>
            </div>
          </h1>
          {/* Gradient underline accent */}
          <div className="mx-auto mb-8 h-1 w-24 rounded-full bg-gradient-to-r from-purple-500 via-indigo-500 to-pink-500 shadow-[0_0_18px_rgba(168,85,247,0.25)]"></div>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-muted-foreground dark:text-white hover:scale-[1.01] transition-transform duration-300">
            A social portfolio platform for designers, artists, writers, developers and all creative professionals to 
            showcase their best work and discover amazing talent.
          </p>
          </div>
          <div className="relative z-20 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/create">
              <Button 
                size="lg" 
                className="bg-purple-gradient hover:bg-blue-500 hover:opacity-90 hover:scale-105 transition-all duration-300 font-quicksand relative overflow-hidden group"
              >
                <span className="relative z-10">Create Your Portfolio</span>
                <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
              </Button>
            </Link>
            <Link to="/explore">
              <Button 
                size="lg" 
                variant="outline" 
                className="group relative overflow-hidden isolate z-10 font-quicksand border hover:scale-105 transition-all duration-300 hover:border-purple-400 hover:bg-purple-50/60 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300"
              >
                <span className="relative z-10">Explore Portfolios</span>
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-2 relative z-10" />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </Button>
            </Link>
          </div>
        
        <div className="mt-16 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card rounded-2xl p-6 shadow-lg backdrop-blur-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/20 animation-delay-150 animate-fade-in">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400 transition-transform duration-300 hover:scale-110">
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-quicksand transition-colors duration-300 hover:text-purple-600 dark:hover:text-purple-400">Create Portfolios</h3>
              <p className="text-muted-foreground transition-colors duration-300 hover:text-foreground">Build beautiful portfolios to showcase your creative work to the world</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 shadow-lg backdrop-blur-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/20 animation-delay-300 animate-fade-in">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400 transition-transform duration-300 hover:scale-110">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-quicksand transition-colors duration-300 hover:text-purple-600 dark:hover:text-purple-400">Connect & Share</h3>
              <p className="text-muted-foreground transition-colors duration-300 hover:text-foreground">Network with fellow creatives and get inspiration from their work</p>
            </div>
            
            <div className="glass-card rounded-2xl p-6 shadow-lg backdrop-blur-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-200/30 dark:hover:shadow-purple-900/20 animation-delay-450 animate-fade-in">
              <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-800/30 flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:bg-purple-200 dark:group-hover:bg-purple-700/50">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400 transition-transform duration-300 hover:scale-110">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2 font-quicksand transition-colors duration-300 hover:text-purple-600 dark:hover:text-purple-400">Get Discovered</h3>
              <p className="text-muted-foreground transition-colors duration-300 hover:text-foreground">Gain exposure and opportunities by showcasing your skills and talents</p>
            </div>
          </div>
          
          <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] opacity-30 dark:opacity-10">
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-[radial-gradient(ellipse_at_center,rgba(147,51,234,0.15)_0%,rgba(99,102,241,0.1)_35%,rgba(236,72,153,0.05)_70%,rgba(255,255,255,0)_100%)]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
