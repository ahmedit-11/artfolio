import React from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";

const TermsPage = () => {
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow animate-fade-in">
        <section className="py-12 bg-gradient-to-b from-background to-secondary/30">
          <div className="container px-4 mx-auto max-w-4xl">
            <PageTitle subtitle="Please read these terms and conditions carefully before using our service.">
              Terms of Service
            </PageTitle>
            
            <Card className="mt-8">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">1. Acceptance of Terms</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    By accessing and using ArtFolio, you accept and agree to be bound by the terms and provision of this agreement. 
                    If you do not agree to abide by the above, please do not use this service.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">2. User Accounts</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    To access certain features of the service, you must register for an account. You agree to:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain the security of your password</li>
                    <li>Accept responsibility for all activities under your account</li>
                    <li>Notify us immediately of any unauthorized use</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">3. Content Guidelines</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Users are responsible for the content they upload. Prohibited content includes:
                  </p>
                  <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                    <li>Copyrighted material without permission</li>
                    <li>Offensive, harmful, or inappropriate content</li>
                    <li>Spam or misleading information</li>
                    <li>Content that violates any applicable laws</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">4. Intellectual Property</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Users retain ownership of their original content but grant ArtFolio a license to display, distribute, 
                    and promote their work on the platform. The ArtFolio platform and its original content are protected by copyright.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">5. Privacy</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the service, 
                    to understand our practices.
                  </p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold mb-4 text-foreground">6. Termination</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    We reserve the right to terminate or suspend accounts that violate these terms. 
                    Users may also delete their accounts at any time through their account settings.
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

export default TermsPage;
