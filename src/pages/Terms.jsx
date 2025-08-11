import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "../utils/scrollToTop";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";

const Terms = () => {
  useScrollToTop();
  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 96;
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow animate-fade-in">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <PageTitle
            subtitle="Welcome to Artfolio! Please read these Terms of Service carefully before using our website and services."
            className="mb-6"
          >
            Terms of Service
          </PageTitle>

          <div className="text-xs text-muted-foreground mb-8">Last updated: August 10, 2025</div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Table of contents */}
            <nav className="md:col-span-1 bg-card border border-border rounded-2xl p-5 h-max md:sticky md:top-24">
              <h2 className="text-sm font-semibold mb-3">Contents</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#acceptance" onClick={(e)=>handleTocClick(e,'acceptance')} className="hover:underline">1. Acceptance of Terms</a></li>
                <li><a href="#accounts" onClick={(e)=>handleTocClick(e,'accounts')} className="hover:underline">2. User Accounts</a></li>
                <li><a href="#content" onClick={(e)=>handleTocClick(e,'content')} className="hover:underline">3. User Content</a></li>
                <li><a href="#guidelines" onClick={(e)=>handleTocClick(e,'guidelines')} className="hover:underline">4. Acceptable Use Guidelines</a></li>
                <li><a href="#ip" onClick={(e)=>handleTocClick(e,'ip')} className="hover:underline">5. Intellectual Property</a></li>
                <li><a href="#termination" onClick={(e)=>handleTocClick(e,'termination')} className="hover:underline">6. Termination</a></li>
                <li><a href="#disclaimers" onClick={(e)=>handleTocClick(e,'disclaimers')} className="hover:underline">7. Disclaimers</a></li>
                <li><a href="#liability" onClick={(e)=>handleTocClick(e,'liability')} className="hover:underline">8. Limitation of Liability</a></li>
                <li><a href="#indemnification" onClick={(e)=>handleTocClick(e,'indemnification')} className="hover:underline">9. Indemnification</a></li>
                <li><a href="#law" onClick={(e)=>handleTocClick(e,'law')} className="hover:underline">10. Governing Law</a></li>
                <li><a href="#changes" onClick={(e)=>handleTocClick(e,'changes')} className="hover:underline">11. Changes to These Terms</a></li>
                <li><a href="#contact" onClick={(e)=>handleTocClick(e,'contact')} className="hover:underline">12. Contact Us</a></li>
              </ul>
            </nav>

            {/* Terms content */}
            <article className="md:col-span-3 space-y-8 max-w-3xl">
              <section id="acceptance" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground">By accessing or using Artfolio, you agree to be bound by these Terms. If you disagree with any part, you may not access the service.</p>
              </section>

              <section id="accounts" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">2. User Accounts</h2>
                <p className="text-muted-foreground">You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.</p>
              </section>

              <section id="content" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">3. User Content</h2>
                <p className="text-muted-foreground mb-3">You retain ownership of content you submit. By posting on Artfolio, you grant us a worldwide, non-exclusive, royalty-free license to host, display, and distribute your content to operate and promote the service.</p>
                <p className="text-sm text-muted-foreground">You are solely responsible for ensuring you have the rights to the content you share.</p>
              </section>

              <section id="guidelines" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">4. Acceptable Use Guidelines</h2>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>No illegal, infringing, or harmful content</li>
                  <li>No harassment, hate speech, or abusive behavior</li>
                  <li>No attempts to disrupt, probe, or reverse engineer the service</li>
                </ul>
              </section>

              <section id="ip" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">5. Intellectual Property</h2>
                <p className="text-muted-foreground">Artfolio’s trademarks, branding, and software are protected by intellectual property laws. You may not copy, modify, or distribute any part of the service without permission.</p>
              </section>

              <section id="termination" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">6. Termination</h2>
                <p className="text-muted-foreground">We may suspend or terminate access to the service at any time if you violate these Terms or for other reasons, with or without notice.</p>
              </section>

              <section id="disclaimers" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">7. Disclaimers</h2>
                <p className="text-muted-foreground">The service is provided on an “AS IS” and “AS AVAILABLE” basis without warranties of any kind. Your use is at your sole risk.</p>
              </section>

              <section id="liability" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">8. Limitation of Liability</h2>
                <p className="text-muted-foreground">To the maximum extent permitted by law, Artfolio and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues.</p>
              </section>

              <section id="indemnification" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">9. Indemnification</h2>
                <p className="text-muted-foreground">You agree to indemnify and hold harmless Artfolio and its affiliates from any claims, damages, liabilities, and expenses arising from your use of the service or violation of these Terms.</p>
              </section>

              <section id="law" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">10. Governing Law</h2>
                <p className="text-muted-foreground">These Terms are governed by the laws of the applicable jurisdiction without regard to its conflict of law provisions.</p>
              </section>

              <section id="changes" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">11. Changes to These Terms</h2>
                <p className="text-muted-foreground">We may update these Terms from time to time. We will post the updated version on this page and revise the “Last updated” date above.</p>
              </section>

              <section id="contact" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">12. Contact Us</h2>
                <p className="text-muted-foreground">Questions about these Terms? Email us at <a className="underline" href="mailto:support@artfolio.app">support@artfolio.app</a> or visit our <Link className="underline" to="/contact">Contact</Link> page.</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );}

export default Terms;