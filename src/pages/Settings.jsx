import React, { useState, useEffect } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import {
  Bell,
  Lock,
  User,
  Shield,
  Globe,
  Palette,
  Volume2,
  Languages,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";

const SettingsSection = ({ icon: Icon, title, description, children }) => (
  <Card className="p-6 mb-6">
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

  // Toggles with persistence
  const [emailNotifs, setEmailNotifs] = useStoredToggle("settings_email_notifs", true);
  const [pushNotifs, setPushNotifs] = useStoredToggle("settings_push_notifs", true);
  const [profileVisible, setProfileVisible] = useStoredToggle("settings_profile_visible", true);
  const [highContrast, setHighContrast] = useStoredToggle("settings_high_contrast", false);
  const [soundEffects, setSoundEffects] = useStoredToggle("settings_sound_effects", true);
  const [notifSounds, setNotifSounds] = useStoredToggle("settings_notif_sounds", true);

  return (

    <div className="container max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>

      <SettingsSection
        icon={User}
        title="Profile Settings"
        description="Manage your profile information and preferences"
      >
        <Button variant="outline" size="sm" onClick={() => navigate('/settings/profile')}>Edit Profile</Button>
      </SettingsSection>

      <SettingsSection
        icon={Bell}
        title="Notifications"
        description="Control how you receive notifications"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Email Notifications</span>
            <Switch checked={emailNotifs} onCheckedChange={setEmailNotifs} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Push Notifications</span>
            <Switch checked={pushNotifs} onCheckedChange={setPushNotifs} />
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Shield}
        title="Privacy"
        description="Manage your privacy settings and data"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Profile Visibility</span>
            <Switch checked={profileVisible} onCheckedChange={setProfileVisible} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Data Usage</span>
            <Button variant="outline" size="sm">Review</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Lock}
        title="Account Security"
        description="Secure your account and manage login settings"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Change Password</span>
            <Button variant="outline" size="sm">Update</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Two-Factor Authentication</span>
            <Button variant="outline" size="sm">Setup</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Palette}
        title="Appearance"
        description="Customize how Artfolio looks on your device"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Theme Preferences</span>
            <ThemeToggle />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Layout Options</span>
            <Button variant="outline" size="sm">Adjust</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Languages}
        title="Language & Region"
        description="Set your preferred language and region"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Language</span>
            <Button variant="outline" size="sm">Change</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Region</span>
            <Button variant="outline" size="sm">Change</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Globe}
        title="Accessibility"
        description="Adjust accessibility options for a better experience"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>High Contrast Mode</span>
            <Switch checked={highContrast} onCheckedChange={setHighContrast} />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Text Size</span>
            <Button variant="outline" size="sm">Adjust</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Volume2}
        title="Sound & Notifications"
        description="Manage sound and notification preferences"
      >
        <div className="space-y-4">
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
        icon={Lock}
        title="Account Management"
        description="Export your data or delete your account"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Export Data</span>
            <Button variant="outline" size="sm">Download</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Delete Account</span>
            <Button variant="destructive" size="sm">Delete</Button>
          </div>
        </div>
      </SettingsSection>

      <SettingsSection
        icon={Shield}
        title="Legal & Policies"
        description="View our Terms, Privacy Policy, and Cookie Policy"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>Terms of Service</span>
            <Button variant="link" size="sm" onClick={() => navigate('/terms')}>View</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Privacy Policy</span>
            <Button variant="link" size="sm" onClick={() => navigate('/privacy')}>View</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span>Cookie Policy</span>
            <Button variant="link" size="sm" onClick={() => navigate('/cookies')}>View</Button>
          </div>
        </div>
      </SettingsSection>
    </div>
  );
};

export default Settings; 