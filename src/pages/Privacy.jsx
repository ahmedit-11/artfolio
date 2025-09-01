import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useScrollToTop } from "../utils/scrollToTop";
import PageTitle from "@/components/PageTitle";
import { Link } from "react-router-dom";

const Privacy = () => {
  useScrollToTop();
  const handleTocClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const headerOffset = 96; // adjust if header height differs
    const y = el.getBoundingClientRect().top + window.pageYOffset - headerOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
    // Update hash without jumping
    history.replaceState(null, "", `#${id}`);
  };
  return (
    <div className="flex flex-col bg-background  min-h-screen">
      <Header />
      <main className="flex-grow animate-fade-in">
        <div className="container mx-auto px-4 py-12 max-w-6xl">
          <PageTitle
            subtitle="Your privacy is important to us. This policy explains how Artova collects, uses, and protects your information."
            className="mb-6 animate-fade-in animation-delay-150"
          >
            Privacy Policy
          </PageTitle>

          <div className="text-xs text-muted-foreground mb-8 animate-fade-in animation-delay-300">Last updated: August 10, 2025</div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Table of contents */}
            <nav className="md:col-span-1 bg-card border border-border rounded-2xl p-5 h-max md:sticky md:top-24 animate-fade-in animation-delay-450">
              <h2 className="text-sm font-semibold mb-3">Contents</h2>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#info-we-collect" onClick={(e)=>handleTocClick(e,'info-we-collect')} className="hover:underline">1. Information We Collect</a></li>
                <li><a href="#how-we-use" onClick={(e)=>handleTocClick(e,'how-we-use')} className="hover:underline">2. How We Use Information</a></li>
                <li><a href="#legal-bases" onClick={(e)=>handleTocClick(e,'legal-bases')} className="hover:underline">3. Legal Bases</a></li>
                <li><a href="#sharing" onClick={(e)=>handleTocClick(e,'sharing')} className="hover:underline">4. Sharing of Information</a></li>
                <li><a href="#cookies" onClick={(e)=>handleTocClick(e,'cookies')} className="hover:underline">5. Cookies & Tracking</a></li>
                <li><a href="#retention" onClick={(e)=>handleTocClick(e,'retention')} className="hover:underline">6. Data Retention</a></li>
                <li><a href="#security" onClick={(e)=>handleTocClick(e,'security')} className="hover:underline">7. Data Security</a></li>
                <li><a href="#your-rights" onClick={(e)=>handleTocClick(e,'your-rights')} className="hover:underline">8. Your Rights</a></li>
                <li><a href="#international" onClick={(e)=>handleTocClick(e,'international')} className="hover:underline">9. International Transfers</a></li>
                <li><a href="#children" onClick={(e)=>handleTocClick(e,'children')} className="hover:underline">10. Children’s Privacy</a></li>
                <li><a href="#changes" onClick={(e)=>handleTocClick(e,'changes')} className="hover:underline">11. Changes to This Policy</a></li>
                <li><a href="#contact" onClick={(e)=>handleTocClick(e,'contact')} className="hover:underline">12. Contact Us</a></li>
              </ul>
            </nav>

            {/* Policy content */}
            <article className="md:col-span-3 space-y-8 max-w-3xl animate-fade-in animation-delay-600">
              <section id="info-we-collect" className="scroll-mt-24 animate-fade-in animation-delay-750">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">1. Information We Collect</h2>
                <p className="text-muted-foreground mb-3">
                  We collect information you provide directly (e.g., when you create an account, build your portfolio, or contact support). We also collect certain data automatically, such as device information, log data, and usage analytics to improve the service.
                </p>
                <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                  <li>Account data: name, email, password, profile details</li>
                  <li>Content data: images, descriptions, tags, comments</li>
                  <li>Usage data: interactions, pages viewed, performance metrics</li>
                  <li>Technical data: IP address, browser type, device identifiers</li>
                </ul>
              </section>

              <section id="how-we-use" className="scroll-mt-24 animate-fade-in animation-delay-900">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">2. How We Use Information</h2>
                <p className="text-muted-foreground">
                  We use your information to operate and improve Artova, personalize your experience, communicate with you, maintain safety, and comply with legal obligations.
                </p>
              </section>

              <section id="legal-bases" className="scroll-mt-24 animate-fade-in animation-delay-1050">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">3. Legal Bases</h2>
                <p className="text-muted-foreground">
                  Where applicable, we process personal data under the following legal bases: consent, performance of a contract, legitimate interests, and compliance with legal obligations.
                </p>
              </section>

              <section id="sharing" className="scroll-mt-24 animate-fade-in animation-delay-1200">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">4. Sharing of Information</h2>
                <p className="text-muted-foreground mb-3">
                  We do not sell your personal information. We may share data with trusted service providers who help us deliver the platform (e.g., hosting, analytics), or when required by law, or to protect our rights and the safety of users.
                </p>
                <p className="text-xs text-muted-foreground">These providers are bound by confidentiality and data protection obligations.</p>
              </section>

              <section id="cookies" className="scroll-mt-24 animate-fade-in animation-delay-1350">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">5. Cookies & Tracking</h2>
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to keep you signed in, remember preferences, and analyze usage. You can control cookies through your browser settings. Disabling some cookies may affect site functionality.
                </p>
              </section>

              <section id="retention" className="scroll-mt-24 animate-fade-in animation-delay-1500">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">6. Data Retention</h2>
                <p className="text-muted-foreground">
                  We keep your information only as long as necessary for the purposes outlined here, unless a longer retention period is required or permitted by law.
                </p>
              </section>

              <section id="security" className="scroll-mt-24 animate-fade-in animation-delay-1650">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">7. Data Security</h2>
                <p className="text-muted-foreground">
                  We implement reasonable technical and organizational measures to help protect your data. However, no method of transmission over the Internet or electronic storage is completely secure.
                </p>
              </section>

              <section id="your-rights" className="scroll-mt-24 animate-fade-in animation-delay-1800">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">8. Your Rights</h2>
                <p className="text-muted-foreground mb-3">
                  Depending on your location, you may have rights to access, correct, delete, or restrict the processing of your personal data, and to withdraw consent.
                </p>
                <p className="text-sm text-muted-foreground">To exercise these rights, contact us using the details below.</p>
              </section>

              <section id="international" className="scroll-mt-24 animate-fade-in animation-delay-1950">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">9. International Transfers</h2>
                <p className="text-muted-foreground">
                  Your information may be transferred to and processed in countries other than your own. Where required, we use appropriate safeguards to protect your data.
                </p>
              </section>

              <section id="children" className="scroll-mt-24 animate-fade-in animation-delay-2100">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">10. Children’s Privacy</h2>
                <p className="text-muted-foreground">
                  Artova is not directed to children under 13 (or the minimum age in your jurisdiction). We do not knowingly collect personal information from children. If you believe a child has provided us data, please contact us so we can take appropriate steps.
                </p>
              </section>

              <section id="changes" className="scroll-mt-24 animate-fade-in animation-delay-2250">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">11. Changes to This Policy</h2>
                <p className="text-muted-foreground">
                  We may update this policy from time to time. We will post the updated version on this page and revise the “Last updated” date above.
                </p>
              </section>

              <section id="contact" className="scroll-mt-24 animate-fade-in animation-delay-2400">
                <h2 className="text-xl font-semibold mb-2 font-quicksand">12. Contact Us</h2>
                <p className="text-muted-foreground mb-2">
                  Questions about this policy? Email us at <a className="underline" href="mailto:privacy@Artova.app">privacy@Artova.app</a> or use our <Link className="underline" to="/contact">Contact</Link> page.
                </p>
                <p className="text-xs text-muted-foreground">Data Controller: Artova</p>
              </section>
            </article>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );}

export default Privacy; 