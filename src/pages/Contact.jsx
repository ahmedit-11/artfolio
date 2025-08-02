import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Loader from "@/components/ui/loader";

const Contact = () => {
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 bg-background">
        <div className="w-full max-w-lg bg-card rounded-lg shadow-lg p-8 animate-fade-in">
          <h1 className="text-3xl font-bold font-quicksand mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">Contact Us</h1>
          <p className="text-muted-foreground mb-6 font-quicksand">Have a question, feedback, or just want to say hello? Fill out the form below and we'll get back to you soon!</p>
          {loading ? (
            <Loader />
          ) : submitted ? (
            <div className="text-center py-8">
              <h2 className="text-2xl font-bold mb-2">Thank you!</h2>
              <p className="text-muted-foreground">Your message has been sent. We'll be in touch soon.</p>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                name="name"
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                required
              />
              <Button type="submit" className="w-full bg-purple-gradient hover:opacity-90 font-quicksand">Send Message</Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Contact; 