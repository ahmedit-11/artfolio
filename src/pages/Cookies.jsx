import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Cookies = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow animate-fade-in">
      <div className="container max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-quicksand mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">Cookie Policy</h1>
        <p className="text-lg text-muted-foreground mb-8 font-quicksand">
          This Cookie Policy explains how Artfolio uses cookies and similar technologies to recognize you when you visit our website.
        </p>
        <div className="bg-card rounded-lg shadow-lg p-8">
          <p className="text-muted-foreground font-quicksand mb-2">We use cookies to enhance your experience, analyze site usage, and assist in our marketing efforts. By using Artfolio, you consent to our use of cookies.</p>
          <ul className="list-disc pl-6 text-muted-foreground font-quicksand">
            <li>Essential cookies for site functionality</li>
            <li>Analytics cookies to understand usage</li>
            <li>Marketing cookies for personalized content</li>
          </ul>
          <p className="text-muted-foreground font-quicksand mt-4">You can manage your cookie preferences in your browser settings.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Cookies; 