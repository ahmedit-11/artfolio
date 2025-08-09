import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "../utils/scrollToTop";

const Privacy = () => {
  useScrollToTop();
  return (
  <div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-grow container mx-auto px-4 py-12 max-w-2xl animate-fade-in">
      <h1 className="text-3xl font-bold mb-6 font-quicksand bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">Privacy Policy</h1>
      <p className="mb-4 font-quicksand">Your privacy is important to us. This Privacy Policy explains how Artfolio collects, uses, and protects your information.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">1. Information We Collect</h2>
      <p className="mb-4 font-quicksand">We collect information you provide directly, such as when you create an account, upload content, or contact us. We may also collect usage data automatically.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">2. How We Use Information</h2>
      <p className="mb-4 font-quicksand">We use your information to provide, maintain, and improve our services, communicate with you, and personalize your experience.</p>
      
      
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">3. Data Retention</h2>
      <p className="mb-4 font-quicksand">We keep your information only as long as necessary to fulfil the purposes outlined in this policy, unless a longer retention period is required by law.</p>
  
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">4. Legal Bases</h2>
      <p className="mb-4 font-quicksand">We process personal data under the following bases: consent, contract performance, legitimate interests, and legal obligations.</p>


      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">5. Sharing of Information</h2>
      <p className="mb-4 font-quicksand">We do not sell your personal information. We may share information with trusted third parties who assist us in operating our platform, as required by law, or to protect our rights.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">6. Data Security</h2>
      <p className="mb-4 font-quicksand">We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is 100% secure.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2 font-quicksand">7. Changes to This Policy</h2>
      <p className="mb-4 font-quicksand">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.</p>
      
      <p className="mt-8 font-quicksand">If you have any questions about this Privacy Policy, please contact us at privacy@artfolio.com.</p>
    </main>
    <Footer />
  </div>
);}

export default Privacy; 