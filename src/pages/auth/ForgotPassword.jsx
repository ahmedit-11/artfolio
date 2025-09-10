import React, { useState } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import PageTitle from "@/components/PageTitle";
import { authAPI } from "../../lib/api";

const ForgotPassword = () => {
  useScrollToTop();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await authAPI.forgotPassword(email);
      
      if (response && response.success) {
        setIsEmailSent(true);
        toast.success("Password reset email sent successfully!");
      } else {
        toast.error("Failed to send reset email. Please try again.");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      let message = "An error occurred. Please try again.";
      
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <div className="flex bg-background flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 animate-fade-in">
              <PageTitle subtitle="Check your email for reset instructions">
                Email Sent
              </PageTitle>
            </div>

            <Card className="border-border shadow-lg animate-fade-in animation-delay-150">
              <CardHeader className="space-y-1 text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-quicksand">Check Your Email</CardTitle>
                <CardDescription className="font-quicksand">
                  We've sent a password reset link to <strong>{email}</strong>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 animate-fade-in animation-delay-300">
                <div className="text-center text-sm text-muted-foreground font-quicksand">
                  <p>If you don't see the email in your inbox, please check your spam folder.</p>
                  <p className="mt-2">The reset link will expire in 60 minutes.</p>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 animate-fade-in animation-delay-450">
                <Button
                  onClick={() => setIsEmailSent(false)}
                  variant="outline"
                  className="w-full font-quicksand"
                >
                  Send Another Email
                </Button>
                <div className="text-center text-sm text-muted-foreground font-quicksand">
                  <Link
                    to="/auth/signin"
                    className="text-primary hover:underline font-semibold transition-all hover:text-purple-600 inline-flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Sign In
                  </Link>
                </div>
              </CardFooter>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex bg-background flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <PageTitle subtitle="Enter your email to receive reset instructions">
              Forgot Password
            </PageTitle>
          </div>

          <Card className="border-border shadow-lg animate-fade-in animation-delay-150">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-quicksand">Reset Password</CardTitle>
              <CardDescription className="font-quicksand">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent className="animate-fade-in animation-delay-300">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2 animate-fade-in animation-delay-450">
                  <Label htmlFor="email" className="font-quicksand">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="name@example.com"
                      className="pl-10 font-quicksand"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-purple-gradient hover:opacity-90 transition-all font-quicksand animate-fade-in animation-delay-600"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">◌</span>
                      Sending Reset Link...
                    </span>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 animate-fade-in animation-delay-750">
              <div className="text-center text-sm text-muted-foreground font-quicksand">
                Remember your password?{" "}
                <Link
                  to="/auth/signin"
                  className="text-primary hover:underline font-semibold transition-all hover:text-purple-600 inline-flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
