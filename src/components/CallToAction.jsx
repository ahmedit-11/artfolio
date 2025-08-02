
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
const CallToAction = () => {
  return (
    <section className="py-16">
      <div className="container px-4 mx-auto">
        <div className="relative rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-purple-gradient"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-400/20 via-transparent to-transparent"></div>
          <div className="relative z-10 px-6 py-16 md:py-24 text-center md:px-12">
            <h2 className="text-3xl font-bold text-white mb-4 md:text-4xl">
              Ready to showcase your creative work?
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of creative professionals who use Purplefolio to display their work, connect with clients, and grow their careers.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
             
            <Link to="/create">
                 <Button 
                   size="lg" 
                   className="bg-purple-gradient border-2 border-white hover:bg-blue-500 hover:opacity-90 hover:scale-105 transition-all duration-300 font-quicksand relative overflow-hidden group"
                 >
                   <span className="relative z-10">Create Your Portfolio</span>
                   <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-indigo-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md"></span>
                 </Button>
               </Link>
               <Link to="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="group font-quicksand hover:scale-105 transition-all duration-300 hover:border-purple-400"
              >
                Learn More
                <ArrowRight className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-2" />
              </Button>
            </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
