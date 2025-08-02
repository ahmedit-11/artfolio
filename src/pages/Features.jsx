import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Features = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow animate-fade-in">
      <div className="container max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-quicksand mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">Features</h1>
        <p className="text-lg text-muted-foreground mb-8 font-quicksand">
          Discover what makes Artfolio the best platform for creatives.
        </p>
        <div className="bg-card rounded-lg shadow-lg p-8">
          <ul className="list-disc pl-6 text-muted-foreground font-quicksand space-y-2">
            <li>Beautiful, customizable portfolio pages</li>
            <li>Dark and light mode support</li>
            <li>Follow and connect with other creatives</li>
            <li>Showcase your work with images, tags, and descriptions</li>
            <li>Responsive design for all devices</li>
            <li>Easy sign up and social login options</li>
            <li>Contact and support features</li>
            <li>And much more coming soon!</li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Features; 