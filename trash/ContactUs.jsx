
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MessageSquare, Phone, Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const ContactUs = () => {
  const { toast } = useToast();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setSubmitting(false);
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
        duration: 5000,
      });
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <div className="container px-4 mx-auto py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-4xl font-bold font-quicksand mb-4">Get in Touch</h1>
              <div className="h-1 w-20 bg-purple-gradient mx-auto rounded-full mb-6"></div>
              <p className="text-muted-foreground font-quicksand max-w-lg mx-auto">
                Have questions or feedback about Purplefolio? We'd love to hear from you! 
                Fill out the form below and our team will get back to you as soon as possible.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div 
                className="bg-background/80 backdrop-blur p-6 rounded-xl border border-border/50 shadow-md text-center transform transition-all duration-500 hover:shadow-lg hover:translate-y-[-5px] opacity-0 animate-fade-in"
                style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
              >
                <div className="size-14 mx-auto bg-purple-gradient rounded-full flex items-center justify-center mb-4">
                  <Mail className="size-6 text-white" />
                </div>
                <h3 className="text-lg font-bold font-quicksand mb-2">Email Us</h3>
                <p className="text-muted-foreground mb-2">For general inquiries</p>
                <a href="mailto:hello@purplefolio.com" className="text-primary hover:underline">
                  hello@purplefolio.com
                </a>
              </div>

              <div 
                className="bg-background/80 backdrop-blur p-6 rounded-xl border border-border/50 shadow-md text-center transform transition-all duration-500 hover:shadow-lg hover:translate-y-[-5px] opacity-0 animate-fade-in"
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
              >
                <div className="size-14 mx-auto bg-purple-gradient rounded-full flex items-center justify-center mb-4">
                  <MessageSquare className="size-6 text-white" />
                </div>
                <h3 className="text-lg font-bold font-quicksand mb-2">Live Chat</h3>
                <p className="text-muted-foreground mb-2">Available weekdays 9am-5pm</p>
                <Button variant="outline" className="font-quicksand">
                  Start Chat
                </Button>
              </div>

              <div 
                className="bg-background/80 backdrop-blur p-6 rounded-xl border border-border/50 shadow-md text-center transform transition-all duration-500 hover:shadow-lg hover:translate-y-[-5px] opacity-0 animate-fade-in"
                style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}
              >
                <div className="size-14 mx-auto bg-purple-gradient rounded-full flex items-center justify-center mb-4">
                  <Phone className="size-6 text-white" />
                </div>
                <h3 className="text-lg font-bold font-quicksand mb-2">Call Us</h3>
                <p className="text-muted-foreground mb-2">Support hotline</p>
                <a href="tel:+15555555555" className="text-primary hover:underline">
                  +1 (555) 555-5555
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div 
              className="mt-16 bg-background/80 backdrop-blur p-8 rounded-xl border border-border/50 shadow-lg opacity-0 animate-fade-in"
              style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}
            >
              <h2 className="text-2xl font-bold font-quicksand mb-6">Send us a Message</h2>
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2 font-quicksand">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-quicksand"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 font-quicksand">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-quicksand"
                      required
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2 font-quicksand">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-quicksand"
                    required
                  />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2 font-quicksand">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows="5"
                    className="w-full px-4 py-3 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none font-quicksand"
                    required
                  ></textarea>
                </div>
                
                <div className="text-right">
                  <Button 
                    type="submit"
                    className="bg-purple-gradient hover:opacity-90 px-8 py-2 font-quicksand"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        Send Message <Send className="ml-2 size-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContactUs;
