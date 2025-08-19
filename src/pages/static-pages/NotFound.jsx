import React from "react";
import { Link } from "react-router-dom";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto max-w-2xl text-center">
            <div className="mb-8">
              <h1 className="text-9xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                404
              </h1>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Page Not Found
              </h2>
              <p className="text-muted-foreground text-lg">
                Sorry, the page you're looking for doesn't exist or has been moved.
              </p>
            </div>

            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Here are some helpful links to get you back on track:
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg transition-all duration-300">
                      <Link to="/">
                        <Home className="w-4 h-4 mr-2" />
                        Go Home
                      </Link>
                    </Button>
                    
                    <Button asChild variant="outline" className="hover:bg-secondary transition-all duration-300">
                      <Link to="/search">
                        <Search className="w-4 h-4 mr-2" />
                        Search Portfolios
                      </Link>
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      onClick={() => window.history.back()}
                      className="hover:bg-secondary transition-all duration-300"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Go Back
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-sm text-muted-foreground">
              <p>
                If you believe this is an error, please{" "}
                <Link 
                  to="/contact" 
                  className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 underline transition-colors"
                >
                  contact our support team
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default NotFoundPage;
