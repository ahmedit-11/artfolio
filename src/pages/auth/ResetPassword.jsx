import React, { useState, useEffect } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "react-toastify";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import PageTitle from "@/components/PageTitle";
import { authAPI } from "../../lib/api";

const ResetPassword = () => {
  useScrollToTop();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    email: searchParams.get('email') || '',
    token: searchParams.get('token') || '',
    password: '',
    password_confirmation: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResetSuccessful, setIsResetSuccessful] = useState(false);

  useEffect(() => {
    // Check if required parameters are present
    if (!formData.token || !formData.email) {
      toast.error("Invalid reset link. Please request a new password reset.");
      navigate('/auth/forgot-password');
    }
  }, [formData.token, formData.email, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.password_confirmation) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authAPI.resetPassword({
        email: formData.email,
        token: formData.token,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      });
      
      if (response && response.success) {
        setIsResetSuccessful(true);
        toast.success("Password reset successfully!");
      } else {
        toast.error("Failed to reset password. Please try again.");
      }
    } catch (error) {
      console.error("Reset password error:", error);
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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (isResetSuccessful) {
    return (
      <div className="flex bg-background flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4 md:p-8 animate-fade-in">
          <div className="w-full max-w-md">
            <div className="text-center mb-8 animate-fade-in">
              <PageTitle subtitle="Your password has been successfully reset">
                Password Reset Complete
              </PageTitle>
            </div>

            <Card className="border-border shadow-lg animate-fade-in animation-delay-150">
              <CardHeader className="space-y-1 text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-quicksand">Success!</CardTitle>
                <CardDescription className="font-quicksand">
                  Your password has been reset successfully. You can now sign in with your new password.
                </CardDescription>
              </CardHeader>
              <CardFooter className="flex flex-col space-y-4 animate-fade-in animation-delay-300">
                <Button
                  onClick={() => navigate('/auth/signin')}
                  className="w-full bg-purple-gradient hover:opacity-90 transition-all font-quicksand"
                >
                  Continue to Sign In
                </Button>
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
            <PageTitle subtitle="Enter your new password">
              Reset Password
            </PageTitle>
          </div>

          <Card className="border-border shadow-lg animate-fade-in animation-delay-150">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-quicksand">Set New Password</CardTitle>
              <CardDescription className="font-quicksand">
                Enter a strong password for your account
              </CardDescription>
            </CardHeader>
            <CardContent className="animate-fade-in animation-delay-300">
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2 animate-fade-in animation-delay-450">
                  <Label htmlFor="password" className="font-quicksand">New Password</Label>
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
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 font-quicksand"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                      />
                    </div>
                  </TooltipProvider>
                  <p className="text-xs text-muted-foreground font-quicksand">
                    Password must be at least 8 characters long
                  </p>
                </div>

                <div className="space-y-2 animate-fade-in animation-delay-600">
                  <Label htmlFor="password_confirmation" className="font-quicksand">Confirm New Password</Label>
                  <TooltipProvider>
                    <div className="relative">
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
                      <Input
                        id="password_confirmation"
                        name="password_confirmation"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        className="pl-10 font-quicksand"
                        value={formData.password_confirmation}
                        onChange={handleInputChange}
                        required
                        minLength={8}
                      />
                    </div>
                  </TooltipProvider>
                </div>
                
                <Button
                  type="submit"
                  className="w-full bg-purple-gradient hover:opacity-90 transition-all font-quicksand animate-fade-in animation-delay-750"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <span className="animate-spin mr-2">◌</span>
                      Resetting Password...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Lock className="mr-2 h-4 w-4" />
                      Reset Password
                    </span>
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 animate-fade-in animation-delay-900">
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

export default ResetPassword;
