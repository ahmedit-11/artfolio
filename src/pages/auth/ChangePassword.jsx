import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, ArrowLeft, CheckCircle, Lock } from "lucide-react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { authAPI } from "@/lib/api";
import { toast } from "react-toastify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ChangePassword = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    new_password_confirmation: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.new_password.length < 8) {
      toast.error('New password must be at least 8 characters long');
      return;
    }

    if (formData.new_password !== formData.new_password_confirmation) {
      toast.error('New passwords do not match');
      return;
    }

    if (formData.current_password === formData.new_password) {
      toast.error('New password must be different from current password');
      return;
    }

    setLoading(true);

    try {
      const response = await authAPI.changePassword(formData);
      
      if (response.success) {
        setSuccess(true);
        toast.success('Password changed successfully!');
        setTimeout(() => {
          navigate('/settings');
        }, 2000);
      } else {
        toast.error(response.message || 'Password change failed');
      }
    } catch (error) {
      console.error('Change password error:', error);
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col min-h-screen bg-background">
        <Header />
        <main className="flex-grow flex items-center justify-center py-12 px-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Password Changed
                </span>
              </CardTitle>
              <CardDescription className="text-center">
                Your password has been successfully updated. You will be redirected to settings shortly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/settings">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700">
                  Back to Settings
                </Button>
              </Link>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow flex items-center justify-center py-12 px-4">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Change Password
              </span>
            </CardTitle>
            <CardDescription className="text-center">
              Update your account password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current_password">Current Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="current_password"
                    name="current_password"
                    type={showPasswords.current ? "text" : "password"}
                    placeholder="Enter current password"
                    value={formData.current_password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('current')}
                  >
                    {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_password">New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new_password"
                    name="new_password"
                    type={showPasswords.new ? "text" : "password"}
                    placeholder="Enter new password"
                    value={formData.new_password}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('new')}
                  >
                    {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new_password_confirmation">Confirm New Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="new_password_confirmation"
                    name="new_password_confirmation"
                    type={showPasswords.confirm ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={formData.new_password_confirmation}
                    onChange={handleChange}
                    className="pl-10 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => togglePasswordVisibility('confirm')}
                  >
                    {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <div className="bg-muted/50 p-3 rounded-lg">
                <p className="text-sm font-medium mb-2">Password Requirements:</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• At least 8 characters long</li>
                  <li>• Different from your current password</li>
                  <li>• Confirmation must match new password</li>
                </ul>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
                disabled={loading}
              >
                {loading ? "Changing Password..." : "Change Password"}
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <Link
                to="/settings"
                className="text-sm text-purple-600 hover:text-purple-500 dark:text-purple-400 dark:hover:text-purple-300 inline-flex items-center"
              >
                <ArrowLeft className="mr-1 h-3 w-3" />
                Back to Settings
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ChangePassword;
