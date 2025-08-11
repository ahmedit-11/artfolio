import React, { useEffect } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  useScrollToTop();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <main className="flex-grow bg-background animate-fade-in">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-100/60 to-indigo-100 dark:from-purple-900/60 dark:to-background transition-colors duration-500">
        <div className="absolute top-4 right-4">
         
        </div>
        <div className="text-center animate-fade-in">
          <div className="flex justify-center mb-6">
            {/* Fun SVG illustration */}
            <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="60" cy="100" rx="40" ry="10" fill="#a78bfa" fillOpacity="0.2" />
              <circle cx="60" cy="60" r="40" fill="#a78bfa" className="dark:fill-indigo-800" />
              <ellipse cx="60" cy="70" rx="18" ry="8" fill="#fff" fillOpacity=".7" />
              <circle cx="48" cy="55" r="5" fill="#fff" />
              <circle cx="72" cy="55" r="5" fill="#fff" />
              <ellipse cx="48" cy="57" rx="2" ry="1" fill="#a78bfa" />
              <ellipse cx="72" cy="57" rx="2" ry="1" fill="#a78bfa" />
              <path d="M50 75 Q60 85 70 75" stroke="#fff" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <h1 className="text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800 dark:from-purple-300 dark:to-indigo-400">404</h1>
          <p className="text-2xl font-semibold text-muted-foreground mb-4">Lost in Art Space</p>
          <p className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.<br />
            But don't worry, you can always find your way back home.
          </p>
          <Button size="lg" className="bg-purple-gradient hover:scale-105 transition-transform duration-200 font-quicksand" onClick={() => navigate("/")}>Return to Home</Button>
        </div>
        {/* Animated floating shapes */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-10 top-20 animate-bounce-slow w-16 h-16 rounded-full bg-purple-200 dark:bg-purple-800 opacity-40 blur-2xl" />
          <div className="absolute right-10 bottom-24 animate-bounce-slower w-24 h-24 rounded-full bg-indigo-200 dark:bg-indigo-800 opacity-30 blur-2xl" />
          <div className="absolute left-1/2 top-1/3 animate-spin-slow w-10 h-10 rounded-full bg-pink-200 dark:bg-pink-800 opacity-30 blur" />
        </div>
        <style>{`
          @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
          @keyframes bounce-slower { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); } }
          @keyframes spin-slow { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
          .animate-bounce-slow { animation: bounce-slow 3s infinite; }
          .animate-bounce-slower { animation: bounce-slower 5s infinite; }
          .animate-spin-slow { animation: spin-slow 8s linear infinite; }
          .animate-fade-in { animation: fadeIn 1s ease; }
          @keyframes fadeIn { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: none; } }
        `}</style>
      </div>
    </main>
  );
};

export default NotFound;
