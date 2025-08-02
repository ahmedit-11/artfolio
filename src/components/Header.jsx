// Header.jsx
// Defines the header/navigation bar for the application, including navigation links, user actions, and theme toggle.
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Heart, Search, User, Home, Image, Menu, X, Mail, LogIn, Compass, Users, TrendingUp, Settings, ArrowLeft } from "lucide-react";
import NotificationDropdown from "./NotificationDropdown";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";
import AvatarMenu from "./AvatarMenu";

// This would come from your auth context
const isAuthenticated = true; // Toggle this to test different states

// Header component manages navigation and user actions
const Header = () => {
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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className={cn("container flex h-16 items-center justify-between", isMenuOpen && "pointer-events-none md:pointer-events-auto")}>
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
          <Link to="/" className="flex items-center space-x-2 rounded">
            <div className="size-8 rounded-full bg-purple-gradient flex items-center justify-center">
              <span className="text-white font-bold text-sm">⭐</span>
            </div>
            <span className="font-bold text-xl gradient-text">Artfolio</span>
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
          <Link to="/contact" className={cn(
            "flex items-center space-x-1.5 text-muted-foreground hover:text-foreground transition-colors font-quicksand border-b-2 border-transparent hover:border-purple-200 dark:hover:border-purple-800",
            location.pathname === "/contact" && "text-primary border-purple-600 dark:border-purple-400"
          )}>
            <Mail className="size-4" />
            <span>Contact</span>
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
            <Search className="size-5 dark:text-white" />
          </Button>
          <NotificationDropdown />
          <ThemeToggle />
          {isAuthenticated ? (
            <AvatarMenu />
          ) : (
            <Link to="/signin">
              <Button variant="ghost" className="bg-purple-gradient hover:opacity-90 font-quicksand text-white">
                <LogIn className="size-4 mr-2" />
                Sign In
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button and User Actions */}
        <div className="flex items-center space-x-3 md:hidden ">
          <NotificationDropdown />
          <ThemeToggle />
          {isAuthenticated ? (
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

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-40 md:hidden transition-transform duration-300 ease-in-out",
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <nav className="container py-6 space-y-4 bg-border " >
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
          <Link to="/contact" className={cn(
            "flex items-center space-x-2 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors",
            location.pathname === "/contact" && "text-primary bg-purple-100 dark:bg-purple-900/20"
          )}>
            <Mail className="size-5" />
            <span>Contact</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
