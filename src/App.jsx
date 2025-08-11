// App.jsx
// Main application component that sets up routing and theme preference for the app.
import React, { useEffect,Suspense } from "react";
import { SearchProvider } from "@/contexts/SearchContext";

// Import routing components from react-router-dom
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchPage from "@/pages/Search";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProfileSettings from "./pages/ProfileSettings";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import FollowingPage from "./pages/Following";
import TrendingPage from "./pages/Trending";
import ExplorePage from "./pages/Explore";
import ForYouPage from "./pages/ForYou";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Features from "./pages/Features";
import Cookies from "js-cookie";
import PortfolioDetail from "./pages/PortfolioDetail";
import CreatePortfolio from "./pages/CreatePortfolio";
import AdminPanel from "./components/admin/AdminPanel";
import { ToastContainer } from "react-toastify";

// const SignUp = lazy(() => import("./pages/SignUp"));
// const SignIn = lazy(() => import("./pages/SignIn"));
// const Settings = lazy(() => import("./pages/Settings"));
// const Profile = lazy(() => import("./pages/Profile"));
// const ProfileSettings = lazy(() => import("./pages/ProfileSettings"));
// const Terms = lazy(() => import("./pages/Terms"));
// const Privacy = lazy(() => import("./pages/Privacy"));
// const FollowingPage = lazy(() => import("./pages/Following"));
// const TrendingPage = lazy(() => import("./pages/Trending"));
// const ExplorePage = lazy(() => import("./pages/Explore"));
// const ForYouPage = lazy(() => import("./pages/ForYou"));
// const Contact = lazy(() => import("./pages/Contact"));
// const About = lazy(() => import("./pages/About"));
// const Features = lazy(() => import("./pages/Features"));
// const Cookies = lazy(() => import("./pages/Cookies"));
// const PortfolioDetail = lazy(() => import("./pages/PortfolioDetail"));
// const CreatePortfolio = lazy(() => import("./pages/CreatePortfolio"));
// const AdminPanel = lazy(() => import("./components/admin/AdminPanel"));
// const SearchPage = lazy(() => import("./pages/Search"));
// import Explore from "./pages/Explore";

// Cookies.remove("token")
const App = () => {
  // useEffect to set the theme (dark/light) based on user preference or system settings
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Main routing structure for the application
  // Uses BrowserRouter for client-side routing
  // Layout wraps the main pages, while other routes are defined for authentication, legal, and error pages
  return (
    <SearchProvider>
      <BrowserRouter>
      <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
          </div>
        }>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/settings/profile" element={<ProfileSettings />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/create" element={<CreatePortfolio />} />
          </Route>
  
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/following" element={<FollowingPage />} />
          <Route path="/trending" element={<TrendingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/for-you" element={<ForYouPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/cookies" element={<Cookies />} />
  
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      </BrowserRouter>
  
      {/* ToastContainer  */}
      <ToastContainer position="top-right" autoClose={3000} limit={3} />
    </SearchProvider>
  );
  
};

export default App;
