import React from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";
import { Heart, Globe2, Users2, ShieldCheck, Sparkles, Target } from "lucide-react";

const About = () => {
  useScrollToTop();
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow animate-fade-in">
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          <div className="animate-fade-in animation-delay-150">
            <PageTitle
              subtitle="Artova is a social portfolio platform for creatives to showcase their work, connect with a global community, and find inspiration. Our mission is to empower artists, designers, and creators to share their stories and grow their careers."
              className="mb-10"
            >
              About Artova
            </PageTitle>
          </div>

          {/* Mission Section */}
          <section aria-labelledby="mission" className="mb-16 animate-fade-in animation-delay-300">
            <h2 id="mission" className="sr-only">Our mission</h2>
            <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-2xl font-bold font-quicksand mb-3">Create. Share. Grow.</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We believe creativity thrives in supportive communities. Artova makes it simple to publish polished portfolios, get discovered, and build meaningful connections.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    <li>Personalized portfolios with consistent, accessible design.</li>
                    <li>Tools that help you reach and engage the right audience.</li>
                    <li>Thoughtful performance and dark/light theme support.</li>
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-border p-5 bg-background/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      <span className="font-medium">For Creators</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Showcase your best work with clarity and style.</p>
                  </div>
                  <div className="rounded-xl border border-border p-5 bg-background/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Users2 className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      <span className="font-medium">For Communities</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Find collaborators, mentors, and your audience.</p>
                  </div>
                  <div className="rounded-xl border border-border p-5 bg-background/50">
                    <div className="flex items-center gap-3 mb-2">
                      <Target className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      <span className="font-medium">For Growth</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Insights that help you improve what you share.</p>
                  </div>
                  <div className="rounded-xl border border-border p-5 bg-background/50">
                    <div className="flex items-center gap-3 mb-2">
                      <ShieldCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                      <span className="font-medium">For Safety</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Responsible moderation for a respectful space.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Values Section */}
          <section aria-labelledby="values" className="mb-16 animate-fade-in animation-delay-450">
            <h2 id="values" className="text-xl font-semibold mb-6">What we value</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6 animate-fade-in animation-delay-600">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Creativity First</h3>
                </div>
                <p className="text-sm text-muted-foreground">Your work deserves a stage that enhances, not distracts.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 animate-fade-in animation-delay-750">
                <div className="flex items-center gap-3 mb-2">
                  <Globe2 className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Global Community</h3>
                </div>
                <p className="text-sm text-muted-foreground">Connect across borders and backgrounds with ease.</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 animate-fade-in animation-delay-900">
                <div className="flex items-center gap-3 mb-2">
                  <ShieldCheck className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                  <h3 className="font-semibold">Trust & Safety</h3>
                </div>
                <p className="text-sm text-muted-foreground">Clear guidelines and tools that keep spaces welcoming.</p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section aria-labelledby="join" className="mb-4 animate-fade-in animation-delay-1050">
            <div className="bg-card border border-border rounded-2xl p-8 text-center">
              <h2 id="join" className="text-2xl font-bold font-quicksand mb-2">Join the Artova community</h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Start your portfolio, explore inspiring creators, and share your journey.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
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
};

export default About; 