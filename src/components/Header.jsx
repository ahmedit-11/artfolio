// Header.jsx
// Defines the header/navigation bar for the application, including navigation links, user actions, and theme toggle.
import React, { useState,useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button";
import { Heart, Search, User, Home, Image, Menu, X, Mail, LogIn, Compass, Users, TrendingUp, Settings, ArrowLeft, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import NotificationDropdown from "./NotificationDropdown";
import AvatarMenu from "./AvatarMenu";

// This would come from your auth context

// Header component manages navigation and user actions
const Header = () => {
  const logoFont = 'Pacifico, cursive';
  // State for mobile menu open/close
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigate = useNavigate();

  // Handle ESC key for back navigation
  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && location.pathname !== "/") {
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [navigate]);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Mount/unmount mobile menu for smooth exit without leaving overlay in DOM
  const [renderMobileMenu, setRenderMobileMenu] = useState(false);
  useEffect(() => {
    if (isMenuOpen) {
      setRenderMobileMenu(true);
      return;
    }
    const t = setTimeout(() => setRenderMobileMenu(false), 300); // match duration-300
    return () => clearTimeout(t);
  }, [isMenuOpen]);
  const token = Cookies.get('token')
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="w-full px-0 flex h-16 md:h-20 items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          {location.pathname !== "/" && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
              className="text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20"
              aria-label="Go back"
            >
              <ArrowLeft className="size-5" />
            </Button>
          )}
          <Link to="/" className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded-lg transition-all duration-200 hover:scale-105" aria-label="Go to homepage">
            <div className="size-14 md:size-16 rounded-full flex items-center justify-center">
             <img src="assets/logo.png" alt="Artova" className="w-14 h-14 md:w-16 md:h-16 object-contain" />
            </div>
            <span className="font-poppins font-bold text-2xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700" style={{ fontFamily: logoFont }}>ArTova</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {/* Navigation links for main pages */}
          <Link to="/" className={cn(
            "flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-quicksand border-b-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
            location.pathname === "/" && "text-primary border-purple-600 dark:border-purple-400"
          )}>
            <Home className="size-4" />
            <span>Home</span>
          </Link>
          <Link to="/following" className={cn(
            "flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-quicksand border-b-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
            location.pathname === "/following" && "text-primary border-purple-600 dark:border-purple-400"
          )}>
            <Users className="size-4" />
            <span>Following</span>
          </Link>
          <Link to="/for-you" className={cn(
            "flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-quicksand border-b-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
            location.pathname === "/for-you" && "text-primary border-purple-600 dark:border-purple-400"
          )}>
            <Compass className="size-4" />
            <span>For You</span>
          </Link>
          <Link to="/trending" className={cn(
            "flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-quicksand border-b-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
            location.pathname === "/trending" && "text-primary border-purple-600 dark:border-purple-400"
          )}>
            <TrendingUp className="size-4" />
            <span>Trending</span>
          </Link>
          <Link to="/explore" className={cn(
            "flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-quicksand border-b-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
            location.pathname === "/explore" && "text-primary border-purple-600 dark:border-purple-400"
          )}>
            <Image className="size-4" />
            <span>Explore</span>
          </Link>
          <Link to="/chat" className={cn(
            "flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-quicksand border-b-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
            location.pathname === "/chat" && "text-primary border-purple-600 dark:border-purple-400"
          )}>
            <MessageCircle className="size-4" />
            <span>Chat</span>
          </Link>
        
        </nav>

        {/* User Actions (Desktop) */}
        <div className="hidden md:flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20"
            onClick={() => navigate("/search")}
          >
            <Search className="size-5 dark:text-white " />
          </Button>
          {/* Notifications bell */}
          <NotificationDropdown />
         
          {token ? (
            <AvatarMenu />
          ) : (
            <Link to="/signin">
              {

                <Button variant="ghost" className="bg-purple-gradient hover:opacity-90 font-quicksand mr-5 text-white">
                  <LogIn className="size-4 mr-2" />
                  Sign In
                </Button>
              }
            </Link>
          )}
        </div>

        {/* Mobile Menu Button and User Actions */}
        <div className="flex items-center space-x-3 md:hidden ">
          
          {/* Notifications bell (mobile) */}
          <NotificationDropdown />
          
          {token ? (
            <AvatarMenu />
          ) : (
            <Link to="/signin">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20">
                <LogIn className="size-5" />
              </Button>
            </Link>
          )}
          {/* Hamburger menu button */}
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20">
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {renderMobileMenu && (
        <div
          className={cn(
            "fixed inset-0 top-16 z-40 md:hidden transition-opacity duration-300 ease-in-out",
            isMenuOpen
              ? "opacity-100 pointer-events-auto bg-black/30"
              : "opacity-0 pointer-events-none bg-transparent"
          )}
          onClick={(e) => e.target === e.currentTarget && setIsMenuOpen(false)}
        >
          {/* Sliding panel */}
          <div
            className={cn(
              "absolute right-0 top-0 h-[calc(100vh-4rem)] w-80 max-w-[90%] bg-background shadow-xl transition-transform duration-300 ease-in-out will-change-transform",
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            )}
          >
            <nav className="p-4 py-6 space-y-2">
          <Link to="/" className={cn(
            "flex items-center space-x-2 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors",
            location.pathname === "/" && "text-primary bg-purple-100 dark:bg-purple-900/20"
          )}>
            <Home className="size-5" />
            <span>Home</span>
          </Link>
          <Link to="/following" className={cn(
            "flex items-center space-x-2 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors",
            location.pathname === "/following" && "text-primary bg-purple-100 dark:bg-purple-900/20"
          )}>
            <Users className="size-5" />
            <span>Following</span>
          </Link>
          <Link to="/for-you" className={cn(
            "flex items-center space-x-2 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors",
            location.pathname === "/for-you" && "text-primary bg-purple-100 dark:bg-purple-900/20"
          )}>
            <Compass className="size-5" />
            <span>For You</span>
          </Link>
          <Link to="/trending" className={cn(
            "flex items-center space-x-2 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors",
            location.pathname === "/trending" && "text-primary bg-purple-100 dark:bg-purple-900/20"
          )}>
            <TrendingUp className="size-5" />
            <span>Trending</span>
          </Link>
          <Link to="/explore" className={cn(
            "flex items-center space-x-2 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors",
            location.pathname === "/explore" && "text-primary bg-purple-100 dark:bg-purple-900/20"
          )}>
            <Image className="size-5" />
            <span>Explore</span>
          </Link>
          <Link to="/chat" className={cn(
            "flex items-center space-x-2 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors",
            location.pathname === "/chat" && "text-primary bg-purple-100 dark:bg-purple-900/20"
          )}>
            <MessageCircle className="size-5" />
            <span>Chat</span>
          </Link>
          
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
