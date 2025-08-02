import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, ArrowRight, Github, Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      toast({
        title: "Please accept the Terms and Privacy Policy",
        description: "You must agree to the Terms of Service and Privacy Policy to continue.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Sign in successful",
        description: "Welcome back to Purplefolio!",
      });
      navigate("/"); // Redirect to home page
    }, 1500);
  };
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold font-quicksand bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-800">
              Welcome Back
            </h1>
            <p className="text-muted-foreground mt-2 font-quicksand">
              Sign in to continue your creative journey
            </p>
          </div>
          
          <Card className="border-border shadow-lg animate-fade-in animation-delay-150">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-quicksand">Sign In</CardTitle>
              <CardDescription className="font-quicksand">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-quicksand">Email</Label>
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
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-quicksand">Password</Label>
                    <Link 
                      to="/forgot-password"
                      className="text-sm text-primary hover:underline font-quicksand transition-all"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <TooltipProvider>
                    <div className="relative">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {showPassword ? (
                            <EyeOff className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={togglePasswordVisibility} />
                          ) : (
                            <Eye className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={togglePasswordVisibility} />
                          )}
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-quicksand">{showPassword ? "Hide password" : "Show password"}</TooltipContent>
                      </Tooltip>
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 font-quicksand"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </TooltipProvider>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="acceptTerms" checked={acceptTerms} onCheckedChange={setAcceptTerms} />
                  <label htmlFor="acceptTerms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-quicksand">
                    I agree to the <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                  </label>
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-purple-gradient hover:opacity-90 transition-all font-quicksand group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">◌</span>
                      Signing In...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Sign In
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  )}
                </Button>
              </form>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground font-quicksand">Or continue with</span>
                </div>
              </div>
              <Button variant="outline" className="w-full font-quicksand hover:bg-muted transition-all mb-2">
                <svg className="mr-2 h-4 w-4" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g><path d="M17.64 9.2045c0-.638-.0573-1.2527-.1636-1.8409H9v3.4818h4.8445c-.2082 1.1218-.8345 2.0736-1.7763 2.7136v2.2545h2.8736C16.9782 14.0845 17.64 11.8582 17.64 9.2045z" fill="#4285F4"/><path d="M9 18c2.43 0 4.4673-.8062 5.9564-2.1864l-2.8736-2.2545c-.7973.5345-1.8145.8491-3.0827.8491-2.3691 0-4.3773-1.6018-5.0964-3.7573H.9391v2.3164C2.4227 16.2936 5.4818 18 9 18z" fill="#34A853"/><path d="M3.9036 10.6509c-.1818-.5345-.2864-1.1045-.2864-1.6509s.1045-1.1164.2864-1.6509V5.0336H.9391C.3409 6.2536 0 7.5791 0 9c0 1.4209.3409 2.7464.9391 3.9664l2.9645-2.3155z" fill="#FBBC05"/><path d="M9 3.5791c1.3227 0 2.5045.4545 3.4364 1.3455l2.5773-2.5773C13.4645.8062 11.4273 0 9 0 5.4818 0 2.4227 1.7064.9391 4.0336l2.9645 2.3164C4.6227 5.1809 6.6309 3.5791 9 3.5791z" fill="#EA4335"/></g></svg>
                 Google
              </Button>
              <Button variant="outline" className="w-full font-quicksand hover:bg-muted transition-all">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground font-quicksand">
                Don't have an account?{" "}
                <Link 
                  to="/signup" 
                  className="text-primary hover:underline font-semibold transition-all hover:text-purple-600"
                >
                  Sign Up
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

export default SignIn;