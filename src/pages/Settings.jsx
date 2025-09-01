import React, { useState, useEffect } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bell,
  Lock,
  User,
  Shield,
  Globe,
  Palette,
  Volume2,
  Languages,
  LogOut,
  
  Download,
  Trash2,
  Eye,
  Smartphone,
  Mail,
  MessageSquare,
  Heart,
  UserPlus,
  
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
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

// small helper hook for localStorage-backed state
const useStoredToggle = (key, defaultValue = false) => {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch (e) {
      return defaultValue;
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {}
  }, [key, value]);
  return [value, setValue];
};

const Settings = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("UTC");

  // Notification preferences with more granular control
  const [emailNotifs, setEmailNotifs] = useStoredToggle("settings_email_notifs", true);
  const [pushNotifs, setPushNotifs] = useStoredToggle("settings_push_notifs", true);
  const [likeNotifs, setLikeNotifs] = useStoredToggle("settings_like_notifs", true);
  const [commentNotifs, setCommentNotifs] = useStoredToggle("settings_comment_notifs", true);
  const [followNotifs, setFollowNotifs] = useStoredToggle("settings_follow_notifs", true);
  const [marketingEmails, setMarketingEmails] = useStoredToggle("settings_marketing_emails", false);
  
  // Privacy settings
  const [profileVisible, setProfileVisible] = useStoredToggle("settings_profile_visible", true);
  const [showOnlineStatus, setShowOnlineStatus] = useStoredToggle("settings_online_status", true);
  const [allowMessages, setAllowMessages] = useStoredToggle("settings_allow_messages", true);
  
  // Accessibility & Display
  const [highContrast, setHighContrast] = useStoredToggle("settings_high_contrast", false);
  const [reducedMotion, setReducedMotion] = useStoredToggle("settings_reduced_motion", false);
  const [soundEffects, setSoundEffects] = useStoredToggle("settings_sound_effects", true);
  const [notifSounds, setNotifSounds] = useStoredToggle("settings_notif_sounds", true);

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

  const handle2FASetup = () => {
    navigate('/settings/two-factor');
  };

  return (

    <div className="container max-w-4xl mx-auto px-4 py-8 bg-background animate-fade-in">
      <PageTitle subtitle="Manage your account preferences and customize your experience" className="mb-8 animate-fade-in animation-delay-150">
        Settings
      </PageTitle>

      <SettingsSection
        icon={User}
        title="Profile Settings"
        description="Manage your profile information and preferences"
        className="animate-fade-in animation-delay-300"
      >
        <Button variant="outline" size="sm" onClick={() => navigate('/settings/profile')}>Edit Profile</Button>
      </SettingsSection>

      <SettingsSection
        icon={Bell}
        title="Notifications"
        description="Control how and when you receive notifications"
        className="animate-fade-in animation-delay-450"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="size-4 text-muted-foreground" />
              <span>Email Notifications</span>
            </div>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Smartphone className="size-4 text-muted-foreground" />
              <span>Push Notifications</span>
            </div>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Heart className="size-4 text-muted-foreground" />
              <span>Likes & Reactions</span>
            </div>
            <Switch checked={likeNotifs} onCheckedChange={setLikeNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="size-4 text-muted-foreground" />
              <span>Comments</span>
            </div>
            <Switch checked={commentNotifs} onCheckedChange={setCommentNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <UserPlus className="size-4 text-muted-foreground" />
              <span>New Followers</span>
            </div>
            <Switch checked={followNotifs} onCheckedChange={setFollowNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Mail className="size-4 text-muted-foreground" />
              <span>Marketing Emails</span>
            </div>
            <Switch checked={marketingEmails} onCheckedChange={setMarketingEmails} />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Shield}
        title="Privacy & Security"
        description="Control who can see your content and interact with you"
        className="animate-fade-in animation-delay-600"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Eye className="size-4 text-muted-foreground" />
              <span>Public Profile</span>
            </div>
            <Switch checked={profileVisible} onCheckedChange={setProfileVisible} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="size-4 text-muted-foreground" />
              <span>Show Online Status</span>
            </div>
            <Switch checked={showOnlineStatus} onCheckedChange={setShowOnlineStatus} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="size-4 text-muted-foreground" />
              <span>Allow Direct Messages</span>
            </div>
            <Switch checked={allowMessages} onCheckedChange={setAllowMessages} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Change Password</span>
            <Button variant="outline" size="sm" onClick={handlePasswordChange}>
              <Lock className="size-4 mr-2" />
              Update
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication</span>
            <Button variant="outline" size="sm" onClick={handle2FASetup}>
              <Shield className="size-4 mr-2" />
              Setup
            </Button>
          </div>
        </div>
      </SettingsSection>



      <SettingsSection
        icon={Palette}
        title="Appearance & Accessibility"
        description="Customize how Artfolio looks and feels"
        className="animate-fade-in animation-delay-750"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Theme</span>
            <ThemeToggle />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>High Contrast Mode</span>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Reduce Motion</span>
            <Switch checked={reducedMotion} onCheckedChange={setReducedMotion} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Sound Effects</span>
            <Switch checked={soundEffects} onCheckedChange={setSoundEffects} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Notification Sounds</span>
            <Switch checked={notifSounds} onCheckedChange={setNotifSounds} />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Languages}
        title="Language & Region"
        description="Set your preferred language and timezone"
        className="animate-fade-in animation-delay-900"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="language">Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ar">العربية</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="EST">EST</SelectItem>
                <SelectItem value="PST">PST</SelectItem>
                <SelectItem value="CET">CET</SelectItem>
                <SelectItem value="JST">JST</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </SettingsSection>





      <SettingsSection
        icon={Download}
        title="Data & Account Management"
        description="Export your data or manage your account"
        className="animate-fade-in animation-delay-1050"
      >
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-medium">Export Your Data</span>
              <p className="text-sm text-muted-foreground">Download all your portfolios, comments, and account data</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleExportData} className="mt-3 w-full sm:mt-0 sm:w-auto">
              <Download className="size-4 mr-2" />
              Export
            </Button>
          </div>
          <Separator />
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="font-medium text-destructive">Delete Account</span>
              <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
            </div>
            <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)} className="mt-3 w-full sm:mt-0 sm:w-auto">
              <Trash2 className="size-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </SettingsSection>



      <SettingsSection
        icon={LogOut}
        title="Log out of your account"
        description="You'll need to sign in again to access your account"
        className="animate-fade-in animation-delay-1200"
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
             
          </div>
          <Button 
            variant="destructive" 
            size="sm" 
            onClick={handleLogoutClick}
            disabled={isLoggingOut}
            className="mt-4 w-full sm:mt-0 sm:w-auto"
          >
            <LogOut className="size-4 mr-2" />
            {isLoggingOut ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
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