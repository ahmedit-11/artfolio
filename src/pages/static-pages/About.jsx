import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Heart, Award } from "lucide-react";

const About = () => {
  useScrollToTop();

  const features = [
    {
      icon: Users,
      title: "Creative Community",
      description: "Connect with talented artists, designers, and creators from around the world."
    },
    {
      icon: Target,
      title: "Showcase Your Work",
      description: "Display your portfolio in a beautiful, professional format that stands out."
    },
    {
      icon: Heart,
      title: "Get Discovered",
      description: "Gain exposure and recognition for your creative work through our platform."
    },
    {
      icon: Award,
      title: "Professional Growth",
      description: "Build your reputation and advance your creative career with our tools."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                About ArtFolio
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              We're building the world's most inspiring platform for creative professionals 
              to showcase their work, connect with peers, and grow their careers.
            </p>
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
              Join Our Community
            </Button>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-8">
                At ArtFolio, we believe that every creative professional deserves a platform 
                to showcase their talent and connect with opportunities. Our mission is to 
                democratize creative discovery and make it easier for artists, designers, 
                and creators to build meaningful careers.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4 mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose ArtFolio?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-8">Our Story</h2>
              <p className="text-lg text-muted-foreground mb-8">
                Founded in 2024, ArtFolio started as a simple idea: what if there was a 
                platform designed specifically for creative professionals? A place where 
                quality work gets recognized, where networking happens naturally, and where 
                careers are built on talent, not just connections.
              </p>
              <p className="text-lg text-muted-foreground">
                Today, we're proud to serve thousands of creators worldwide, helping them 
                showcase their work, find new opportunities, and build the careers they've 
                always dreamed of.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600">
          <div className="container px-4 mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Start showcasing your work today and connect with creative professionals worldwide.
            </p>
            <div className="space-x-4">
              <Button size="lg" variant="secondary">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-purple-600">
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
