import React, { useEffect, useState } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { useDispatch, useSelector } from "react-redux";
import { loginThunk } from "../../store/auth/thunk/loginThunk";
import { getCurrentUserThunk } from "../../store/currentUser/thunk/getCurrentUserThunk";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, ArrowRight, Github, Eye, EyeOff } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
// import { useToast } from "@/components/ui/use-toast";
import { toast } from "react-toastify";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import PageTitle from "@/components/PageTitle";
const SignIn = () => {
  useScrollToTop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);

  const handleSignIn = async (e) => {
    e.preventDefault();
    
    // Prevent any default form behavior
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    
    try {
      const result = await dispatch(loginThunk({ email, password }));
      
      if (loginThunk.fulfilled.match(result)) {
        toast.success("Login Successfully!");
        
        // Get user data to determine role-based navigation
        const userResult = await dispatch(getCurrentUserThunk());
        
        if (getCurrentUserThunk.fulfilled.match(userResult)) {
          const user = userResult.payload;
          
          // Navigate based on user role
          if (user.role === 'admin') {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          // Fallback to home if user data fetch fails
          navigate("/");
        }
      } else {
        // Handle error from thunk
        const errorMessage = result.payload || "Login failed. Please try again.";
        toast.error(errorMessage);
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.error("An unexpected error occurred");
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
    <div className="flex bg-background flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4 md:p-8 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8 animate-fade-in">
            <PageTitle subtitle="Sign in to continue your creative journey">
              Welcome Back
            </PageTitle>
          </div>

          <Card className="border-border shadow-lg animate-fade-in animation-delay-150">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-quicksand">Sign In</CardTitle>
              <CardDescription className="font-quicksand">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent className="animate-fade-in animation-delay-300">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2 animate-fade-in animation-delay-450">
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
                <div className="space-y-2 animate-fade-in animation-delay-600">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="font-quicksand">Password</Label>
                    <Link
                      to="/auth/forgot-password"
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
                        placeholder="* * * * * * * *"
                        className="pl-10 font-quicksand"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </TooltipProvider>
                </div>
                
                <Button
                  className="w-full bg-purple-gradient hover:opacity-90 transition-all font-quicksand group animate-fade-in animation-delay-750"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
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

             
              
              
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 animate-fade-in animation-delay-900">
              <div className="text-center text-sm text-muted-foreground font-quicksand">
                Don't have an account?{" "}
                <Link
                  to="/auth/signup"
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
