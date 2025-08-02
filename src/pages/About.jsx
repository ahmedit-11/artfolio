import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow animate-fade-in">
      <div className="container max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-quicksand mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">About Artfolio</h1>
        <p className="text-lg text-muted-foreground mb-8 font-quicksand">
          Artfolio is a social portfolio platform for creatives to showcase their work, connect with a global community, and find inspiration. Our mission is to empower artists, designers, and creators to share their stories and grow their careers.
        </p>
        <div className="bg-card rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-2 font-quicksand">Our Team & Mission</h2>
          <p className="mb-4 font-quicksand">
            We are a passionate team of designers, developers, and artists who believe in the power of creativity. Artfolio was built to break down barriers and make it easy for anyone to share their creative journey.
          </p>
          <ul className="list-disc pl-6 text-muted-foreground font-quicksand">
            <li>Connect with fellow creatives from around the world</li>
            <li>Showcase your work in a beautiful, modern portfolio</li>
            <li>Discover new trends, techniques, and inspiration</li>
            <li>Grow your audience and career</li>
          </ul>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default About; 