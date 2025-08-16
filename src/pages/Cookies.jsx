import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "../utils/scrollToTop";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";

const Cookies = () => {
  useScrollToTop();
  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 96; // adjust to your header height
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
            subtitle="This Cookie Policy explains how Artova uses cookies and similar technologies to recognize you when you visit our website."
            className="mb-6"
          >
            Cookie Policy
          </PageTitle>

          <div className="text-xs text-muted-foreground mb-8">Last updated: August 10, 2025</div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Table of contents */}
            <nav className="md:col-span-1 bg-card border border-border rounded-2xl p-5 h-max md:sticky md:top-24">
              <h2 className="text-sm font-semibold mb-3">Contents</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#what-are-cookies" onClick={(e)=>handleTocClick(e,'what-are-cookies')} className="hover:underline">1. What Are Cookies?</a></li>
                <li><a href="#types" onClick={(e)=>handleTocClick(e,'types')} className="hover:underline">2. Types of Cookies We Use</a></li>
                <li><a href="#how-we-use" onClick={(e)=>handleTocClick(e,'how-we-use')} className="hover:underline">3. How We Use Cookies</a></li>
                <li><a href="#manage" onClick={(e)=>handleTocClick(e,'manage')} className="hover:underline">4. Managing Your Preferences</a></li>
                <li><a href="#third-party" onClick={(e)=>handleTocClick(e,'third-party')} className="hover:underline">5. Third‑Party Cookies</a></li>
                <li><a href="#retention" onClick={(e)=>handleTocClick(e,'retention')} className="hover:underline">6. Cookie Retention</a></li>
                <li><a href="#changes" onClick={(e)=>handleTocClick(e,'changes')} className="hover:underline">7. Changes to This Policy</a></li>
                <li><a href="#contact" onClick={(e)=>handleTocClick(e,'contact')} className="hover:underline">8. Contact Us</a></li>
              </ul>
            </nav>

            {/* Policy content */}
            <article className="md:col-span-3 space-y-8 max-w-3xl">
              <section id="what-are-cookies" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">1. What Are Cookies?</h2>
                <p className="text-muted-foreground">Cookies are small text files placed on your device to store data that can be recalled by a web server in the domain that placed the cookie. They help websites remember your preferences and improve your experience.</p>
              </section>

              <section id="types" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">2. Types of Cookies We Use</h2>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li><span className="font-medium text-foreground">Essential cookies</span> for core site functionality (authentication, security, load balancing).</li>
                  <li><span className="font-medium text-foreground">Analytics cookies</span> to understand usage and improve performance.</li>
                  <li><span className="font-medium text-foreground">Preference cookies</span> to remember settings like theme and language.</li>
                  <li><span className="font-medium text-foreground">Marketing cookies</span> to deliver and measure relevant content where applicable.</li>
                </ul>
              </section>

              <section id="how-we-use" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">3. How We Use Cookies</h2>
                <p className="text-muted-foreground">We use cookies to keep you signed in, personalize your experience, analyze traffic, and improve features. Some cookies are set by third parties that provide services to us (e.g., analytics providers).</p>
              </section>

              <section id="manage" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">4. Managing Your Preferences</h2>
                <p className="text-muted-foreground mb-3">Most web browsers allow you to control cookies through their settings. You can typically configure your browser to block cookies or alert you when cookies are being sent.</p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Adjust settings in your browser (Chrome, Firefox, Safari, Edge)</li>
                  <li>Use “Do Not Track” or similar privacy features if supported</li>
                  <li>Clear cookies from your device to remove stored data</li>
                </ul>
              </section>

              <section id="third-party" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">5. Third‑Party Cookies</h2>
                <p className="text-muted-foreground">Some cookies may be set by third parties, such as analytics partners. These third parties may use cookies over which we have limited control. Please refer to their policies for details.</p>
              </section>

              <section id="retention" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">6. Cookie Retention</h2>
                <p className="text-muted-foreground">Cookies may be session-based (deleted when you close your browser) or persistent (remain until they expire or are deleted). Retention periods vary based on the purpose of the cookie.</p>
              </section>

              <section id="changes" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">7. Changes to This Policy</h2>
                <p className="text-muted-foreground">We may update this Cookie Policy from time to time. We will post updates on this page and revise the “Last updated” date above.</p>
              </section>

              <section id="contact" className="scroll-mt-24">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">8. Contact Us</h2>
                <p className="text-muted-foreground">Questions about our use of cookies? Email us at <a className="underline" href="mailto:privacy@Artova.app">privacy@Artova.app</a> or visit our <Link className="underline" to="/contact">Contact</Link> page.</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
export default Cookies;