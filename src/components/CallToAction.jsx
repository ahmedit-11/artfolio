
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Rocket, 
  Palette, 
  Trophy, 
  Heart, 
  Zap,
  ArrowRight,
  Play,
  Users,
  TrendingUp,
  Eye
} from "lucide-react";

const CallToAction = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const features = [
    { icon: Palette, text: "Stunning Portfolios", color: "from-pink-500 to-rose-500" },
    { icon: Users, text: "Global Community", color: "from-blue-500 to-cyan-500" },
    { icon: TrendingUp, text: "Career Growth", color: "from-green-500 to-emerald-500" },
    { icon: Trophy, text: "Recognition", color: "from-yellow-500 to-orange-500" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100
    });
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Animated background particles */}
      {/* <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div> */}

      <div className="container px-4 mx-auto relative z-10">
        <div 
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-background via-card to-background dark:from-slate-900 dark:via-purple-900/50 dark:to-slate-900 shadow-2xl border border-border dark:border-purple-500/20"
          onMouseMove={handleMouseMove}
        >
          {/* Dynamic gradient overlay based on mouse position */}
          <div 
            className="absolute inset-0 opacity-30 transition-all duration-500 ease-out"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.3), transparent 40%)`
            }}
          />
          
          {/* Floating geometric shapes */}
          <div className="absolute top-10 left-10 w-20 h-20 border-2 border-purple-400/30 rounded-full animate-spin-slow" />
          <div className="absolute top-20 right-20 w-16 h-16 bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-lg rotate-45 animate-pulse" />
          <div className="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-full animate-bounce" />

          <div className="relative z-20 px-8 py-16 md:py-24 text-center">
            {/* Animated heading with rotating features */}
            <div className="mb-6">
              <h2 className="text-4xl md:text-6xl font-bold text-foreground dark:text-white mb-4 leading-tight">
                Your Art Deserves the
                <span className="block relative">
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient-x">
                    Perfect Stage
                  </span>
                  <Sparkles className="absolute -top-2 -right-8 w-8 h-8 text-yellow-400 animate-pulse" />
                </span>
              </h2>
              
              {/* Rotating feature showcase */}
              <div className="h-16 flex items-center justify-center">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div
                      key={index}
                      className={`absolute transition-all duration-700 ${
                        activeFeature === index 
                          ? 'opacity-100 transform translate-y-0 scale-100' 
                          : 'opacity-0 transform translate-y-4 scale-95'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-3 rounded-full bg-gradient-to-r ${feature.color} shadow-lg`}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-semibold text-foreground/90 dark:text-white/90">
                          {feature.text}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <p className="text-lg text-muted-foreground dark:text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed">
              Join thousands of creators who've transformed their careers with stunning portfolios. 
              Your breakthrough moment starts here.
            </p>

            {/* Interactive stats with hover effects */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
              {[
                { number: "20K+", label: "Active Creators", icon: Users, gradient: "from-blue-500 to-purple-500" },
                { number: "500k+", label: "Portfolio Views", icon: Eye, gradient: "from-pink-500 to-red-500" },
                { number: "4.2k+", label: "Hires Initiated", icon: Rocket, gradient: "from-indigo-500 to-blue-600" }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div 
                    key={index}
                    className="group relative p-6 rounded-2xl bg-card/50 dark:bg-white/5 backdrop-blur-sm border border-border dark:border-white/10 hover:border-purple-400/50 transition-all duration-300 hover:transform hover:scale-105 hover:bg-card/70 dark:hover:bg-white/10"
                  >
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${stat.gradient} flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-foreground dark:text-white mb-2">{stat.number}</div>
                    <div className="text-muted-foreground dark:text-white/70 text-sm font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>

            {/* Enhanced CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/create">
                <Button 
                  size="lg" 
                  className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-0 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Rocket className="w-5 h-5 group-hover:animate-bounce" />
                    Start Creating Now
                    <Sparkles className="w-4 h-4 group-hover:animate-spin" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </Link>
              
              <Link to="/explore">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="group relative px-8 py-4 border-2 border-gray-200 hover:border-purple-400 hover:bg-purple-50/60 dark:hover:bg-purple-900/20 hover:text-purple-700 dark:hover:text-purple-300 font-semibold rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
                >
                  <span className="flex items-center gap-2">
                    <Play className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Explore Portfolio
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </Button>
              </Link>
            </div>

            {/* Subtle call-out */}
            <div className="mt-8 flex items-center justify-center gap-2 dark:text-white/60 text-sm">
              <Zap className="w-4 h-4 text-yellow-400" />
              <span className="">Free to start • No credit card required</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
