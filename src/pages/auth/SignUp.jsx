import React, { useEffect, useState } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Mail, User, ArrowRight, Github, Eye, EyeOff, CloudCog, Check, X } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ToastContainer, toast } from 'react-toastify';
import PageTitle from "@/components/PageTitle";

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { authAPI } from "../../lib/api";

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
  const [passwordRequirements, setPasswordRequirements] = useState({
    minLength: false,
    hasUppercase: false,
    hasLowercase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const navigate = useNavigate();

  // Password validation function
  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*]/.test(password)
    };
  };

  // Check if password meets all requirements
  const isPasswordValid = Object.values(passwordRequirements).every(req => req);

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordRequirements(validatePassword(newPassword));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isPasswordValid) {
      toast.error("Password does not meet all requirements");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (!acceptTerms) {
      toast.error("Please accept the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authAPI.register({
        name,
        email,
        password,
        password_confirmation: confirmPassword
      });

      if (response.success) {
        // Store token in cookie
        Cookies.set('token', response.data.access_token, { expires: 7 });
        
        toast.success('Account created successfully!');
        navigate('/');
      } else {
        toast.error(response.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Create Account
              </span>
            </CardTitle>
            <CardDescription className="text-center">
              Join our creative community today
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              {/* Password Requirements */}
              <div className="bg-muted/50 p-3 rounded-lg space-y-2">
                <p className="text-sm font-medium">Password Requirements:</p>
                <div className="grid grid-cols-1 gap-1 text-xs">
                  {[
                    { key: 'minLength', label: 'At least 8 characters' },
                    { key: 'hasUppercase', label: 'One uppercase letter (A-Z)' },
                    { key: 'hasLowercase', label: 'One lowercase letter (a-z)' },
                    { key: 'hasNumber', label: 'One number (0-9)' },
                    { key: 'hasSpecialChar', label: 'One special character (!@#$%^&*)' }
                  ].map(({ key, label }) => (
                    <div key={key} className={`flex items-center gap-2 ${passwordRequirements[key] ? 'text-green-600' : 'text-muted-foreground'}`}>
                      {passwordRequirements[key] ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={setAcceptTerms}
                />
                <Label htmlFor="terms" className="text-sm">
                  I agree to the{" "}
                  <Link to="/terms" className="text-purple-600 hover:text-purple-500">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-purple-600 hover:text-purple-500">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                disabled={isLoading || !isPasswordValid || password !== confirmPassword || !acceptTerms}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              Already have an account?{" "}
              <Link to="/signin" className="text-purple-600 hover:text-purple-500 font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SignUp;
