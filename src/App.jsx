// App.jsx
// Main application component that sets up routing and theme preference for the app.
import React, { useEffect,Suspense } from "react";
import { SearchProvider } from './contexts/SearchContext';
import { ChatProvider } from './contexts/ChatContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Import routing components from react-router-dom
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "@/components/Layout";
// import SearchPage from "@/pages/search/Search";
// import Index from "./pages/home/Index";
// import NotFound from "./pages/static-pages/NotFound";
// import SignIn from "./pages/auth/SignIn";
// import SignUp from "./pages/auth/SignUp";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import ResetPassword from "./pages/auth/ResetPassword";
// import ChangePassword from "./pages/auth/ChangePassword";
// import Settings from "./pages/settings/Settings";
// import Profile from "./pages/profile/Profile";
// import ProfileSettings from "./pages/ProfileSettings";
// import Terms from "./pages/static-pages/Terms";
// import Privacy from "./pages/static-pages/Privacy";
// import FollowingPage from "./pages/following/Following";
// import TrendingPage from "./pages/trending/Trending";
// import ExplorePage from "./pages/explore/Explore";
// import ForYouPage from "./pages/for-you/ForYou";
// import Contact from "./pages/static-pages/Contact";
// import About from "./pages/static-pages/About";
// import Features from "./pages/static-pages/Features";
// import CookiesPage from "./pages/static-pages/Cookies";
// import PortfolioDetail from "./pages/portfolio-detail/PortfolioDetail";
// import CreatePortfolio from "./pages/create-portfolio/CreatePortfolio";
// import AdminPanel from "./components/admin/AdminPanel";
// import { ToastContainer } from "react-toastify";









import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import SearchPage from "@/pages/Search";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ChangePassword from "./pages/ChangePassword";
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
import CookiesPage from "./pages/Cookies";
import PortfolioDetail from "./pages/PortfolioDetail";
import CreatePortfolio from "./pages/CreatePortfolio";
import AdminPanel from "./components/admin/AdminPanel";
// import Chat from "./pages/chat/Chat";
// import ChatTest from "./pages/chat/ChatTest";
// import TestAuth from "./pages/chat/TestAuth";
// import TestUsers from "./pages/chat/TestUsers";
// import SimpleChatTest from "./pages/chat/SimpleChatTest";
import SimpleChat from "./pages/chat/SimpleChat";
import CategoryPage from "./pages/CategoryPage";
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
      <NotificationProvider>
        <BrowserRouter>
          <ChatProvider>
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
            <Route path="/settings/change-password" element={<ChangePassword />} />
            <Route path="/portfolio/:id" element={<PortfolioDetail />} />
            <Route path="/create" element={<CreatePortfolio />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/chat" element={<SimpleChat />} />
            {/* <Route path="/chat-old" element={<Chat />} /> */}
            {/* <Route path="/chat-test" element={<ChatTest />} />
            <Route path="/test-auth" element={<TestAuth />} />
            <Route path="/test-users" element={<TestUsers />} />
            <Route path="/simple-chat" element={<SimpleChatTest />} /> */}
          </Route>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
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
          <Route path="/cookies" element={<CookiesPage />} />
  
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
          </ChatProvider>
        </BrowserRouter>
      </NotificationProvider>
      {/* ToastContainer  */}
      <ToastContainer position="top-right" autoClose={3000} limit={3} />
    </SearchProvider>
  );
  
};

export default App;
