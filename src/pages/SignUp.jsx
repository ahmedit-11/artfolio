import React, { useEffect, useState } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, User, ArrowRight, Github, Eye, EyeOff, CloudCog } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import PageTitle from "@/components/PageTitle";

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import axios from "axios";
// import { title } from "process";

const SignUp = () => {
  useScrollToTop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  // const { toast } = useToast();
  const handleSignUp = async (e) => {
    e.preventDefault();
    // if (!acceptTerms) {
    //   toast({
    //     title: "Please accept the Terms and Privacy Policy",
    //     description: "You must agree to the Terms of Service and Privacy Policy to continue.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    // if (password !== confirmPassword) {
    //   toast({
    //     title: "Password mismatch",
    //     description: "Please make sure your passwords match.",
    //     variant: "destructive",
    //   });
    //   return;
    // }

    setIsLoading(true);
    try {
      await axios.get('http://192.168.1.110:8000/sanctum/csrf-cookie');
      axios.defaults.withCredentials = true;

      const response = await axios.post(
        "http://192.168.1.110:8000/api/register",
        {
          name,
          email,
          password,
          password_confirmation: confirmPassword
        },
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      );
      setIsLoading(false);
      // toast({
      //   title: "Account created!",
      //   description: "Welcome to Purplefolio! Let's create your first portfolio.",
      // });
      toast.success("register has done suussussfuly")
      setTimeout(() => {
        navigate("/signin"); // Redirect to home page
      }, 500);
    } catch (error) {
      console.log(error)

      // if(error.)
      setIsLoading(false);
      if (error.message == "Network Error") {
        toast.error("you don,t have a connection with internet")
      }
      if (error.message == "Request failed with status code 422") {
        toast.error("this email has been taken")
      }
      console.log(error.message)
      let message = "Something went wrong. Please try again.";
      if (error.response && error.response.data) {
        if (typeof error.response.data === "string") {
          message = error.response.data;
        } else if (error.response.data.message) {
          message = error.response.data.message;
        } else if (error.response.data.errors) {
          // Laravel validation errors
          const errors = error.response.data.errors;
          message = Object.values(errors).flat().join(" ");
        }
      }
      // toast({
      //   title: "Signup failed",
      //   description: message,
      //   variant: "destructive",
      // });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };
  useEffect(() => {
    if (Cookies.get("token")) { 
      navigate('/')
    }
  }, [])
  return (
    <div className="flex flex-col bg-background min-h-screen">
      <ToastContainer />
      <Header />
      <main className="flex-grow flex items-center  justify-center p-4 md:p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <PageTitle subtitle="Create an account to showcase your creative work">
              Join Artfolio
            </PageTitle>
          </div>

          <Card className="border-border shadow-lg animate-fade-in animation-delay-150">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-quicksand">Sign Up</CardTitle>
              <CardDescription className="font-quicksand">
                Enter your details to create your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-quicksand">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      className="pl-10 font-quicksand"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
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
                  <Label htmlFor="password" className="font-quicksand">Password</Label>
                  <div className="relative">
                    <TooltipProvider>
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
                    </TooltipProvider>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="password"
                      className="pl-10 font-quicksand"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-quicksand">Confirm Password</Label>
                  <div className="relative">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          {showConfirmPassword ? (
                            <EyeOff className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={toggleConfirmPasswordVisibility} />
                          ) : (
                            <Eye className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={toggleConfirmPasswordVisibility} />
                          )}
                        </TooltipTrigger>
                        <TooltipContent side="right" className="font-quicksand">{showConfirmPassword ? "Hide password" : "Show password"}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="confirm password"
                      className="pl-10 font-quicksand"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" checked={acceptTerms} onCheckedChange={setAcceptTerms} required />
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-quicksand">
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
                      Creating Account...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Create Account
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
                <svg className="mr-2 h-4 w-4" width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg"><g><path d="M17.64 9.2045c0-.638-.0573-1.2527-.1636-1.8409H9v3.4818h4.8445c-.2082 1.1218-.8345 2.0736-1.7763 2.7136v2.2545h2.8736C16.9782 14.0845 17.64 11.8582 17.64 9.2045z" fill="#4285F4" /><path d="M9 18c2.43 0 4.4673-.8062 5.9564-2.1864l-2.8736-2.2545c-.7973.5345-1.8145.8491-3.0827.8491-2.3691 0-4.3773-1.6018-5.0964-3.7573H.9391v2.3164C2.4227 16.2936 5.4818 18 9 18z" fill="#34A853" /><path d="M3.9036 10.6509c-.1818-.5345-.2864-1.1045-.2864-1.6509s.1045-1.1164.2864-1.6509V5.0336H.9391C.3409 6.2536 0 7.5791 0 9c0 1.4209.3409 2.7464.9391 3.9664l2.9645-2.3155z" fill="#FBBC05" /><path d="M9 3.5791c1.3227 0 2.5045.4545 3.4364 1.3455l2.5773-2.5773C13.4645.8062 11.4273 0 9 0 5.4818 0 2.4227 1.7064.9391 4.0336l2.9645 2.3164C4.6227 5.1809 6.6309 3.5791 9 3.5791z" fill="#EA4335" /></g></svg>
                Google
              </Button>
              <Button variant="outline" className="w-full font-quicksand hover:bg-muted transition-all">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground font-quicksand">
                Already have an account?{" "}
                <Link
                  to="/signin"
                  className="text-primary hover:underline font-semibold transition-all hover:text-purple-600"
                >
                  Sign In
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

export default SignUp;