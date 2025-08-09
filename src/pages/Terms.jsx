import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "../utils/scrollToTop";

const Terms = () => {
  useScrollToTop();
  return (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-12 max-w-2xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 font-quicksand bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">Terms of Service</h1>
      <p className="mb-4 font-quicksand">Welcome to Artfolio! Please read these terms of service ("Terms", "Terms of Service") carefully before using our website and services.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">1. Acceptance of Terms</h2>
      <p className="mb-4 font-quicksand">By accessing or using Artfolio, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">2. User Accounts</h2>
      <p className="mb-4 font-quicksand">You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">3. Content</h2>
      <p className="mb-4 font-quicksand">You retain ownership of your content but grant us a license to use, display, and distribute it on our platform. You are responsible for the legality of your content.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">4. Termination</h2>
      <p className="mb-4 font-quicksand">We may terminate or suspend access to our service immediately, without prior notice or liability, for any reason whatsoever.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">5. Changes to Terms</h2>
      <p className="mb-4 font-quicksand">We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.</p>
      <p className="mt-8 font-quicksand">If you have any questions about these Terms, please contact us at support@artfolio.com.</p>
    </main>
    <Footer />
  </div>
);}

export default Terms; 