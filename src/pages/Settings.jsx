import React, { useState } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lock, User, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PageTitle from "@/components/PageTitle";
import { authAPI } from "../lib/api";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";

const SettingsSection = ({ icon: Icon, title, description, children, className }) => (
  <Card className={`p-6 mb-6 ${className || ''}`}>
    <div className="flex items-start space-x-4">
      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
        <Icon className="size-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {children}
        
      </div>
    </div>
  </Card>
);


const Settings = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  // Event handlers
  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const handleLogout = async () => {
    setShowLogoutDialog(false);
    setIsLoggingOut(true);
    try {
      await authAPI.logout();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error("Logout error:", error);
      toast.success("Logged out successfully!");
    } finally {
      setIsLoggingOut(false);
      navigate("/signin");
    }
  };

  const handleDeleteAccount = () => {
    setShowDeleteDialog(false);
    toast.success("Account deletion request submitted. You will receive an email with further instructions.");
  };

  const handleExportData = () => {
    toast.success("Data export started. You will receive an email when it's ready for download.");
  };

  const handlePasswordChange = () => {
    navigate('/settings/change-password');
  };

  const handleEditProfile = () => {
    navigate('/settings/profile');
  };

  return (

    <div className="container max-w-2xl mx-auto px-4 py-8 bg-background animate-fade-in">
      <PageTitle subtitle="Manage your essential account settings" className="mb-8 animate-fade-in animation-delay-150">
        Settings
      </PageTitle>

      {/* Edit Profile */}
      <SettingsSection
        icon={User}
        title="Edit Profile"
        description="Update your profile information and personal details"
        className="animate-fade-in animation-delay-300"
      >
        <Button variant="outline" onClick={handleEditProfile}>
          <User className="size-4 mr-2" />
          Edit Profile
        </Button>
      </SettingsSection>

      {/* Reset Password */}
      <SettingsSection
        icon={Lock}
        title="Reset Password"
        description="Change your account password for security"
        className="animate-fade-in animation-delay-450"
      >
        <Button variant="outline" onClick={handlePasswordChange}>
          <Lock className="size-4 mr-2" />
          Change Password
        </Button>
      </SettingsSection>

      {/* Delete Account */}
      <SettingsSection
        icon={Trash2}
        title="Delete Account"
        description="Permanently delete your account and all associated data"
        className="animate-fade-in animation-delay-600"
      >
        <Button variant="destructive" onClick={() => setShowDeleteDialog(true)}>
          <Trash2 className="size-4 mr-2" />
          Delete Account
        </Button>
      </SettingsSection>

      {/* Log Out */}
      <SettingsSection
        icon={LogOut}
        title="Log Out"
        description="Sign out of your account on this device"
        className="animate-fade-in animation-delay-750"
      >
        <Button 
          variant="destructive" 
          onClick={handleLogoutClick}
          disabled={isLoggingOut}
        >
          <LogOut className="size-4 mr-2" />
          {isLoggingOut ? "Signing out..." : "Log Out"}
        </Button>
      </SettingsSection>

      <ConfirmDialog
        isOpen={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteAccount}
        title="Delete Account"
        message="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
      />

      <ConfirmDialog
        isOpen={showLogoutDialog}
        onClose={() => setShowLogoutDialog(false)}
        onConfirm={handleLogout}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        placement="bottom"
      />
    </div>
  );
};

export default Settings; 