
import React from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Following from "@/components/Following";

const FollowingPage = () => {
  return (
    <>
      <Helmet>
        <title>Following | Purplefolio</title>
        <meta name="description" content="Stay updated with your favorite creators and their latest portfolios" />
      </Helmet>
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow">
          <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
            <div className="container px-4 mx-auto">
              <div className="max-w-2xl">
                <h1 className="text-3xl font-bold font-quicksand mb-3">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
                    Following
                  </span>
                </h1>
                <p className="text-muted-foreground font-quicksand">
                  Stay updated with your favorite creators and their latest portfolio updates.
                </p>
              </div>
              <div className="mt-8">
                <Following />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FollowingPage;
