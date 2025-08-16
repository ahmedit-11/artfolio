import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";
import { useScrollToTop } from "../utils/scrollToTop";
import PageTitle from "@/components/PageTitle";
import { Mail, MessageSquare, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

const Contact = () => {
  useScrollToTop();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="flex flex-col bg-background min-h-screen">
      <Header />
      <main className="flex-grow p-4 md:p-10 animate-fade-in">
        <div className="container mx-auto max-w-6xl">
          <PageTitle
            subtitle="Have a question, feedback, or just want to say hello? Send us a message and we'll get back to you within 1–2 business days."
            className="mb-8"
          >
            Contact Us
          </PageTitle>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Form */}
            <div className="md:col-span-3 bg-card border border-border rounded-2xl p-6 md:p-8">
              {loading ? (
                <div className="flex items-center justify-center py-10"><Loader /></div>
              ) : submitted ? (
                <div className="text-center py-10">
                  <div className="mx-auto w-12 h-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl font-bold mb-1">Thank you!</h2>
                  <p className="text-muted-foreground mb-4">Your message has been sent. We'll be in touch soon.</p>
                  <Button onClick={() => { setSubmitted(false); setForm({ name: "", email: "", message: "" }); }} variant="outline">
                    Send another message
                  </Button>
                </div>
              ) : (
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="How can we help?"
                      rows={6}
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                    <p className="mt-2 text-xs text-muted-foreground">We respect your privacy and only use this info to respond.</p>
                  </div>

                  <Button type="submit" disabled={loading} className="w-full md:w-auto inline-flex items-center gap-2 bg-purple-gradient hover:opacity-90 font-quicksand">
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Contact Info */}
            <aside className="md:col-span-2 space-y-4">
              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold mb-4">Reach us directly</h3>
                <ul className="space-y-3 text-sm text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-foreground">Email</span>
                      <div><a href="mailto:support@Artova.app" className="hover:underline">support@Artova.app</a></div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MessageSquare className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-foreground">Community</span>
                      <div>Join the conversation on our socials.</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-foreground">Phone</span>
                      <div>+1 (555) 012-3456</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-purple-600 dark:text-purple-400 mt-0.5" aria-hidden="true" />
                    <div>
                      <span className="text-foreground">Location</span>
                      <div>San Francisco, CA</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-card border border-border rounded-2xl p-6">
                <h3 className="font-semibold mb-2">Response times</h3>
                <p className="text-sm text-muted-foreground">We aim to reply within 1–2 business days. For urgent issues, include “URGENT” in your subject line.</p>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 