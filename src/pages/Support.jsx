import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Support = () => (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow animate-fade-in">
      <div className="container max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold font-quicksand mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">Support</h1>
        <p className="text-lg text-muted-foreground mb-8 font-quicksand">
          Need help? Find answers to common questions or contact our support team.
        </p>
        <div className="bg-card rounded-lg shadow-lg p-8 text-center">
          <p className="text-muted-foreground font-quicksand">Support resources coming soon. For urgent issues, please use the <a href='/contact' className='text-primary underline'>Contact</a> page.</p>
        </div>
      </div>
    </main>
    <Footer />
  </div>
);

export default Support; 