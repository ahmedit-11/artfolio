// Layout.jsx
// Defines the main layout structure for the application, including header, footer, and main content area.
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

// Layout component wraps the page with a header, main content, and footer
const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header is displayed at the top of every page */}
      <Header />
      {/* Main content area where routed pages are rendered */}
      <main className="flex-grow">
        <Outlet /> {/* Renders the matched child route component */}
      </main>
      {/* Footer is displayed at the bottom of every page */}
      <Footer />
    </div>
  );
};

export default Layout; 