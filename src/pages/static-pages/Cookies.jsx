import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";

const CookiesPage = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto max-w-4xl">
            <PageTitle subtitle="Learn about how we use cookies to enhance your experience on ArtFolio.">
              Cookie Policy
            </PageTitle>
            
            <Card className="mt-8">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">What Are Cookies?</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Cookies are small text files that are stored on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences and improving site functionality.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Types of Cookies We Use</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Essential Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        These cookies are necessary for the website to function properly. They enable basic features like 
                        page navigation, access to secure areas, and authentication.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Performance Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        These cookies collect information about how visitors use our website, such as which pages are 
                        visited most often. This data helps us improve the website's performance.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Functionality Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        These cookies remember choices you make (such as theme preferences) and provide enhanced, 
                        more personal features.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">Authentication Cookies</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        These cookies keep you logged in and maintain your session security while using the platform.
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Managing Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You can control and manage cookies in several ways:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Browser settings: Most browsers allow you to refuse or accept cookies</li>
                    <li>Delete existing cookies through your browser's privacy settings</li>
                    <li>Set your browser to notify you when cookies are being sent</li>
                    <li>Use private/incognito browsing mode</li>
                  </ul>
                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Please note that disabling certain cookies may affect the functionality of our website.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Third-Party Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may use third-party services that set their own cookies. These services help us analyze 
                    website traffic and improve user experience. We do not control these third-party cookies.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Updates to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this cookie policy from time to time to reflect changes in our practices or 
                    for other operational, legal, or regulatory reasons.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Contact Us</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    If you have any questions about our use of cookies, please contact us through our support channels.
                  </p>
                </div>

                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Last updated: January 2024
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default CookiesPage;
