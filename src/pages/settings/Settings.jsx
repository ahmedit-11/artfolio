import React, { useState, useEffect } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
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
import { authAPI } from "../../lib/api";
import { toast } from "react-toastify";
import ConfirmDialog from "@/components/ConfirmDialog";
import SettingsSection from "./components/SettingsSection";

const Settings = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    likes: true,
    comments: true,
    follows: true,
    marketing: false,
  });
  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showEmail: false,
    showActivity: true,
  });
  const [preferences, setPreferences] = useState({
    language: "en",
    autoplay: true,
    soundEffects: true,
  });
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
  };

  const handlePrivacyChange = (key, value) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
  };

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      toast.success('Logged out successfully');
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Logout failed');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      // Simulate account deletion
      toast.success('Account deletion request submitted');
      setShowDeleteDialog(false);
      navigate('/signin');
    } catch (error) {
      console.error('Delete account error:', error);
      toast.error('Account deletion failed');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageTitle subtitle="Manage your account preferences and privacy settings.">
          Settings
        </PageTitle>

        {/* Profile Settings */}
        <SettingsSection
          icon={User}
          title="Profile"
          description="Manage your profile information and visibility"
        >
          <div className="space-y-4">
            <Button onClick={() => navigate('/settings/profile')}>
              Edit Profile
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <Label>Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Control who can see your profile</p>
              </div>
              <Select value={privacy.profileVisibility} onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="friends">Friends Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingsSection>

        {/* Security Settings */}
        <SettingsSection
          icon={Lock}
          title="Security"
          description="Keep your account secure with these settings"
        >
          <div className="space-y-4">
            <Button onClick={() => navigate('/settings/change-password')}>
              Change Password
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" size="sm">
                Enable 2FA
              </Button>
            </div>
          </div>
        </SettingsSection>

        {/* Notification Settings */}
        <SettingsSection
          icon={Bell}
          title="Notifications"
          description="Choose what notifications you want to receive"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Mail className="size-4" />
                <Label>Email Notifications</Label>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => handleNotificationChange('email', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Smartphone className="size-4" />
                <Label>Push Notifications</Label>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => handleNotificationChange('push', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Heart className="size-4" />
                <Label>Likes & Reactions</Label>
              </div>
              <Switch
                checked={notifications.likes}
                onCheckedChange={(checked) => handleNotificationChange('likes', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <MessageSquare className="size-4" />
                <Label>Comments</Label>
              </div>
              <Switch
                checked={notifications.comments}
                onCheckedChange={(checked) => handleNotificationChange('comments', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <UserPlus className="size-4" />
                <Label>New Followers</Label>
              </div>
              <Switch
                checked={notifications.follows}
                onCheckedChange={(checked) => handleNotificationChange('follows', checked)}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Privacy Settings */}
        <SettingsSection
          icon={Shield}
          title="Privacy"
          description="Control your privacy and data sharing preferences"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Email Address</Label>
                <p className="text-sm text-muted-foreground">Display your email on your profile</p>
              </div>
              <Switch
                checked={privacy.showEmail}
                onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Show Activity Status</Label>
                <p className="text-sm text-muted-foreground">Let others see when you're active</p>
              </div>
              <Switch
                checked={privacy.showActivity}
                onCheckedChange={(checked) => handlePrivacyChange('showActivity', checked)}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Appearance Settings */}
        <SettingsSection
          icon={Palette}
          title="Appearance"
          description="Customize how the app looks and feels"
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <ThemeToggle />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Language</Label>
                <p className="text-sm text-muted-foreground">Select your preferred language</p>
              </div>
              <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="es">Español</SelectItem>
                  <SelectItem value="fr">Français</SelectItem>
                  <SelectItem value="de">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </SettingsSection>

        {/* Data & Storage */}
        <SettingsSection
          icon={Download}
          title="Data & Storage"
          description="Manage your data and storage preferences"
        >
          <div className="space-y-4">
            <Button variant="outline">
              <Download className="size-4 mr-2" />
              Download My Data
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <Label>Autoplay Videos</Label>
                <p className="text-sm text-muted-foreground">Automatically play videos in feed</p>
              </div>
              <Switch
                checked={preferences.autoplay}
                onCheckedChange={(checked) => handlePreferenceChange('autoplay', checked)}
              />
            </div>
          </div>
        </SettingsSection>

        {/* Account Actions */}
        <SettingsSection
          icon={LogOut}
          title="Account"
          description="Manage your account and session"
        >
          <div className="space-y-4">
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="size-4 mr-2" />
              Sign Out
            </Button>
            <Separator />
            <div className="pt-4">
              <h4 className="font-medium text-destructive mb-2">Danger Zone</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button 
                variant="destructive" 
                onClick={() => setShowDeleteDialog(true)}
              >
                <Trash2 className="size-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </SettingsSection>

        <ConfirmDialog
          isOpen={showDeleteDialog}
          onClose={() => setShowDeleteDialog(false)}
          onConfirm={handleDeleteAccount}
          title="Delete Account"
          description="Are you sure you want to delete your account? This action cannot be undone and all your data will be permanently removed."
          confirmText="Delete Account"
          variant="destructive"
        />
      </div>
    </div>
  );
};

export default Settings;
