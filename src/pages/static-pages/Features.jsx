import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { Palette, SunMoon, Users2, Image, Smartphone, LogIn, Sparkles } from "lucide-react";
import { useScrollToTop } from "../../utils/scrollToTop";

const Features = () => {
  useScrollToTop();
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow animate-fade-in">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <header className="mb-12 text-center animate-fade-in animation-delay-150">
            <h1 className="text-4xl md:text-5xl p-5 font-bold font-quicksand mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Everything you need to shine
            </h1>
            <p className="text-lg text-muted-foreground font-quicksand max-w-3xl mx-auto">
              Artova gives creators a polished home for their work, tools to grow an audience, and the flexibility to express a unique style.
            </p>
          </header>

          <section aria-labelledby="feature-grid" className="mb-16 animate-fade-in animation-delay-300">
            <h2 id="feature-grid" className="sr-only">Key features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-450">
                <div className="flex items-center gap-3 mb-3">
                  <Palette className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Customizable Portfolios</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Beautiful layouts with tags, descriptions, and media to present your work your way.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-600">
                <div className="flex items-center gap-3 mb-3">
                  <SunMoon className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Dark & Light Themes</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  First-class theme support that respects system preferences and saves your choice.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-750">
                <div className="flex items-center gap-3 mb-3">
                  <Users2 className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Community & Following</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Discover, follow, and engage with other creatives to grow together.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-900">
                <div className="flex items-center gap-3 mb-3">
                  <Image className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Rich Media Support</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Showcase high-quality images and detailed write‑ups with consistent styling.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-1050">
                <div className="flex items-center gap-3 mb-3">
                  <Smartphone className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Responsive by Design</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Looks great on phones, tablets, and desktops with thoughtful spacing and typography.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow animate-fade-in animation-delay-1200">
                <div className="flex items-center gap-3 mb-3">
                  <LogIn className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Fast Onboarding</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Quick sign‑up and familiar flows so you can start sharing in minutes.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="more-features" className="mb-16 animate-fade-in animation-delay-1350">
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400 shrink-0 mt-1" aria-hidden="true" />
                <div>
                  <h2 id="more-features" className="text-xl font-semibold mb-2">Thoughtful details that matter</h2>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Unified avatars and tags ensure a clean, consistent look across the app.</li>
                    <li>Accessibility‑minded components with sensible fallbacks.</li>
                    <li>Performance‑friendly animations and smooth page transitions.</li>
                    <li>Clear navigation and search to help visitors find your best work.</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Link to="/explore" className="inline-flex items-center justify-center rounded-md bg-purple-600 text-white px-5 py-2.5 font-medium hover:bg-purple-700 transition-colors">
                  Explore Portfolios
                </Link>
                <Link to="/create" className="inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 font-medium hover:bg-accent/40">
                  Start Your Portfolio
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Features;