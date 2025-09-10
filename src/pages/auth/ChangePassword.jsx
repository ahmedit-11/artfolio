import React, { useState } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "react-toastify";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import PageTitle from "@/components/PageTitle";
import { authAPI } from "../../lib/api";

const ChangePassword = () => {
  useScrollToTop();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    current_password: '',
    new_password: '',
    new_password_confirmation: ''
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangeSuccessful, setIsChangeSuccessful] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (formData.new_password !== formData.new_password_confirmation) {
      toast.error("New passwords do not match");
      return;
    }

    if (formData.new_password.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }

    if (formData.current_password === formData.new_password) {
      toast.error("New password must be different from current password");
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await authAPI.changePassword({
        current_password: formData.current_password,
        new_password: formData.new_password,
        new_password_confirmation: formData.new_password_confirmation
      });
      
      if (response && response.success) {
        setIsChangeSuccessful(true);
        toast.success("Password changed successfully!");
      } else {
        toast.error("Failed to change password. Please try again.");
      }
    } catch (error) {
      console.error("Change password error:", error);
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

  const toggleCurrentPasswordVisibility = () => {
    setShowCurrentPassword(!showCurrentPassword);
  };

  const toggleNewPasswordVisibility = () => {
    setShowNewPassword(!showNewPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  if (isChangeSuccessful) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8 bg-background animate-fade-in">
        <div className="text-center mb-8">
          <PageTitle subtitle="Your password has been successfully updated">
            Password Changed
          </PageTitle>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-quicksand">Success!</CardTitle>
            <CardDescription className="font-quicksand">
              Your password has been changed successfully. Your account is now more secure.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button
              onClick={() => navigate('/settings')}
              className="w-full bg-purple-gradient hover:opacity-90 transition-all font-quicksand"
            >
              Back to Settings
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 bg-background animate-fade-in">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/settings')} 
        className="mb-4 font-quicksand"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Settings
      </Button>

      <div className="text-center mb-8">
        <PageTitle subtitle="Update your account password for better security">
          Change Password
        </PageTitle>
      </div>

      <Card className="border-border shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-quicksand">Update Password</CardTitle>
          <CardDescription className="font-quicksand">
            Enter your current password and choose a new secure password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current_password" className="font-quicksand">Current Password</Label>
              <TooltipProvider>
                <div className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {showCurrentPassword ? (
                        <EyeOff className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={toggleCurrentPasswordVisibility} />
                      ) : (
                        <Eye className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={toggleCurrentPasswordVisibility} />
                      )}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-quicksand">{showCurrentPassword ? "Hide password" : "Show password"}</TooltipContent>
                  </Tooltip>
                  <Input
                    id="current_password"
                    name="current_password"
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 font-quicksand"
                    value={formData.current_password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </TooltipProvider>
            </div>

            <div className="space-y-2">
              <Label htmlFor="new_password" className="font-quicksand">New Password</Label>
              <TooltipProvider>
                <div className="relative">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {showNewPassword ? (
                        <EyeOff className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={toggleNewPasswordVisibility} />
                      ) : (
                        <Eye className="absolute left-3 top-3 h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground transition-colors" onClick={toggleNewPasswordVisibility} />
                      )}
                    </TooltipTrigger>
                    <TooltipContent side="right" className="font-quicksand">{showNewPassword ? "Hide password" : "Show password"}</TooltipContent>
                  </Tooltip>
                  <Input
                    id="new_password"
                    name="new_password"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 font-quicksand"
                    value={formData.new_password}
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

            <div className="space-y-2">
              <Label htmlFor="new_password_confirmation" className="font-quicksand">Confirm New Password</Label>
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
                    id="new_password_confirmation"
                    name="new_password_confirmation"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    className="pl-10 font-quicksand"
                    value={formData.new_password_confirmation}
                    onChange={handleInputChange}
                    required
                    minLength={8}
                  />
                </div>
              </TooltipProvider>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-2 font-quicksand">Password Requirements:</h4>
              <ul className="text-xs text-muted-foreground space-y-1 font-quicksand">
                <li>• At least 8 characters long</li>
                <li>• Different from your current password</li>
                <li>• Consider using a mix of letters, numbers, and symbols</li>
              </ul>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-purple-gradient hover:opacity-90 transition-all font-quicksand"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center">
                  <span className="animate-spin mr-2">◌</span>
                  Changing Password...
                </span>
              ) : (
                <span className="flex items-center">
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </span>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChangePassword;
