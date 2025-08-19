import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";

const PrivacyPage = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto max-w-4xl">
            <PageTitle subtitle="Learn how we collect, use, and protect your personal information.">
              Privacy Policy
            </PageTitle>
            
            <Card className="mt-8">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Information We Collect</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We collect information you provide directly to us, such as when you create an account, upload content, or contact us:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Account information (name, email, profile picture)</li>
                    <li>Portfolio content and descriptions</li>
                    <li>Comments and interactions</li>
                    <li>Communication with our support team</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">How We Use Your Information</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process transactions and send related information</li>
                    <li>Send technical notices and support messages</li>
                    <li>Respond to comments, questions, and requests</li>
                    <li>Monitor and analyze trends and usage</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Information Sharing</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, 
                    except as described in this policy. We may share information in response to legal requests or to protect our rights.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Data Security</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We implement appropriate security measures to protect your personal information against unauthorized access, 
                    alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Your Rights</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Access and update your personal information</li>
                    <li>Delete your account and associated data</li>
                    <li>Opt out of certain communications</li>
                    <li>Request a copy of your data</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. 
                    You can control cookie settings through your browser preferences.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">Changes to This Policy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We may update this privacy policy from time to time. We will notify you of any changes by posting the new policy on this page 
                    and updating the "Last updated" date.
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

export default PrivacyPage;
