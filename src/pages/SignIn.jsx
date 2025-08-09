import React, { useEffect, useState } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
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
import axios from "axios";

const SignIn = () => {
  useScrollToTop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.get('http://192.168.1.110:8000/sanctum/csrf-cookie');
      axios.defaults.withCredentials = true;
      const response = await axios.post("/login", {
        email,
        password,
      });
      console.log(response.data?.data?.access_token)
      Cookies.set("token", response.data?.data?.access_token)
      navigate("/"); // Redirect to home page
    } catch (error) {
      let message = "An error occurred. Please try again.";
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
        alert(message)
      }
      toast({
        title: "Sign in failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    if (Cookies.get("token")) { 
      navigate('/')
    }
  }, [])
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