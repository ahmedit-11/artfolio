import React from "react";
import { Link } from "react-router-dom";
import { ArrowUp, Heart } from "lucide-react";
import { scrollToTop } from "../utils/scrollToTop";

const Footer = () => {
  const logoFont = 'Pacifico, cursive';
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-t border-border/40 shadow-inner animate-fade-in">
      <div className="container px-4 py-6 md:py-12 mx-auto">
        <div className=" flex gap-2   justify-between">
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4 rounded">
              <div className="hidden md:flex md:size-16 rounded-full items-center justify-center">
                <img src="assets/logo.png" alt="Artova" className="w-10 h-10 md:w-16 md:h-16 object-contain" />
              </div>
              <span className="font-poppins font-bold text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700" style={{ fontFamily: logoFont }}>ArTova</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A social portfolio platform for creatives to showcase their work and connect with a global community.
            </p>
          </div>

          <div >
            
            <h3 className="font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/features" className="text-muted-foreground hover:text-foreground focus:text-foreground rounded transition-colors">
 
                  Features
                </Link>
              </li>
              <li>
                <span className="text-muted-foreground opacity-60">Support (Coming soon...)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">Resources</h3>
            <ul className="space-y-2 text-sm">
        
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-foreground focus:text-foreground rounded transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-foreground focus:text-foreground rounded transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-foreground focus:text-foreground rounded transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-muted-foreground hover:text-foreground focus:text-foreground rounded transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-muted-foreground hover:text-foreground focus:text-foreground rounded transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Artova. All rights reserved.
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                Made with <Heart className="size-3 text-red-500" /> by the Artova team
              </p>
            </div>
            <div className="flex  items-center gap-4">
              <button
                onClick={() => scrollToTop({ behavior: 'smooth' })}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors hover:bg-purple-100 dark:hover:bg-purple-900/20 px-3 py-1.5 rounded-lg"
                aria-label="Scroll to top"
              >
                <ArrowUp className="size-4" />
                Back to top
              </button>
            </div>
            <div className="flex space-x-6">
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Twitter (opens in a new tab)" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Twitter</span>
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Open Instagram (opens in a new tab)" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">Instagram</span>
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub (opens in a new tab)" className="text-muted-foreground hover:text-foreground transition-colors">
                <span className="sr-only">GitHub</span>
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
