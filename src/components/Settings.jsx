// Settings.jsx
// Displays a settings form with various user preferences and account settings, including profile, notifications, privacy, and security settings.
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// Settings component renders a settings form with various user preferences and account settings
const Settings = ({
  className,
  initialData = {
    profile: {
      name: "",
      email: "",
      bio: "",
      location: "",
      website: "",
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      marketingEmails: false,
    },
    privacy: {
      profileVisibility: "public",
      showEmail: false,
      showLocation: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
    },
  },
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  // State for form data
  const [formData, setFormData] = useState(initialData);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [name]: value,
      },
    }));
  };

  // Handle switch changes
  const handleSwitchChange = (section, field) => (checked) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: checked,
      },
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              value={formData.profile.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.profile.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={formData.profile.bio}
              onChange={handleChange}
              placeholder="Tell us about yourself"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.profile.location}
              onChange={handleChange}
              placeholder="Enter your location"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website</Label>
            <Input
              id="website"
              name="website"
              value={formData.profile.website}
              onChange={handleChange}
              placeholder="Enter your website URL"
            />
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive email notifications for important updates
              </p>
            </div>
            <Switch
              checked={formData.notifications.emailNotifications}
              onCheckedChange={handleSwitchChange("notifications", "emailNotifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive push notifications on your device
              </p>
            </div>
            <Switch
              checked={formData.notifications.pushNotifications}
              onCheckedChange={handleSwitchChange("notifications", "pushNotifications")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive marketing and promotional emails
              </p>
            </div>
            <Switch
              checked={formData.notifications.marketingEmails}
              onCheckedChange={handleSwitchChange("notifications", "marketingEmails")}
            />
          </div>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Profile Visibility</Label>
              <p className="text-sm text-muted-foreground">
                Make your profile visible to everyone
              </p>
            </div>
            <Switch
              checked={formData.privacy.profileVisibility === "public"}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({
                  ...prev,
                  privacy: {
                    ...prev.privacy,
                    profileVisibility: checked ? "public" : "private",
                  },
                }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Email</Label>
              <p className="text-sm text-muted-foreground">
                Display your email on your profile
              </p>
            </div>
            <Switch
              checked={formData.privacy.showEmail}
              onCheckedChange={handleSwitchChange("privacy", "showEmail")}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Show Location</Label>
              <p className="text-sm text-muted-foreground">
                Display your location on your profile
              </p>
            </div>
            <Switch
              checked={formData.privacy.showLocation}
              onCheckedChange={handleSwitchChange("privacy", "showLocation")}
            />
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication</Label>
              <p className="text-sm text-muted-foreground">
                Enable two-factor authentication for added security
              </p>
            </div>
            <Switch
              checked={formData.security.twoFactorAuth}
              onCheckedChange={handleSwitchChange("security", "twoFactorAuth")}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
            <Input
              id="sessionTimeout"
              type="number"
              value={formData.security.sessionTimeout}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  security: {
                    ...prev.security,
                    sessionTimeout: parseInt(e.target.value),
                  },
                }))
              }
              min={5}
              max={120}
            />
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default Settings; 