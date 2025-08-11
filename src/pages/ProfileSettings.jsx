import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useScrollToTop } from "@/utils/scrollToTop";
import { Twitter, Github, Linkedin, Instagram, Facebook, Globe, Link as LinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
const initialProfile = {
  bio: "Digital artist and UI designer passionate about creating immersive experiences.",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=creative_artist",
  links: [
    { label: "Twitter", url: "https://twitter.com/creative_artist" },
    { label: "GitHub", url: "https://github.com/creative_artist" },
  ],
};

const SOCIAL_PLATFORMS = [
  { key: "twitter", label: "Twitter", icon: Twitter, placeholder: "https://twitter.com/yourhandle" },
  { key: "github", label: "GitHub", icon: Github, placeholder: "https://github.com/yourhandle" },
  { key: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/yourhandle" },
  { key: "instagram", label: "Instagram", icon: Instagram, placeholder: "https://instagram.com/yourhandle" },
  { key: "facebook", label: "Facebook", icon: Facebook, placeholder: "https://facebook.com/yourhandle" },
  { key: "website", label: "Website", icon: Globe, placeholder: "https://yourwebsite.com" },
];

// Utility to get/set profile data in localStorage
const PROFILE_KEY = "artfolio_profile";
function loadProfile() {
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}
function saveProfile(profile) {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

const ProfileSettings = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const storedProfile = loadProfile();
  const [fullName, setFullName] = useState(storedProfile?.fullName || "Sarah Anderson");
  const [bio, setBio] = useState(storedProfile?.bio || initialProfile.bio);
  const [avatar, setAvatar] = useState(storedProfile?.avatar || initialProfile.avatar);
  const [links, setLinks] = useState(() => {
    // Start with social platforms
    const social = SOCIAL_PLATFORMS.map(p => {
      // Try to find a saved value for this platform
      const saved = storedProfile?.socialLinks?.find(l => l.platform === p.key);
      return {
        platform: p.key,
        label: p.label,
        icon: p.icon,
        url: saved ? saved.url : "",
        isSocial: true,
      };
    });
    // Add any custom links
    const custom = (storedProfile?.socialLinks || []).filter(l => !SOCIAL_PLATFORMS.some(p => p.key === l.platform)).map(l => ({
      ...l,
      icon: LinkIcon,
      isSocial: false,
    }));
    return [...social, ...custom];
  });
  const [newLink, setNewLink] = useState({ label: "", url: "" });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleLinkChange = (idx, field, value) => {
    setLinks(links => links.map((l, i) => i === idx ? { ...l, [field]: value } : l));
  };

  const handleRemoveLink = idx => {
    setLinks(links => links.filter((_, i) => i !== idx));
  };

  const handleAddLink = () => {
    if (!newLink.label || !newLink.url) return;
    setLinks([...links, { ...newLink, icon: LinkIcon, isSocial: false }]);
    setNewLink({ label: "", url: "" });
  };

  const handleAvatarChange = e => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = ev => setAvatar(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = e => {
    e.preventDefault();
    setError("");
    if (!fullName.trim()) {
      setError("Full Name cannot be empty");
      return;
    }
    if (!bio.trim()) {
      setError("Bio cannot be empty");
      return;
    }
    setSaving(true);
    // Only save links with a non-empty url
    const filteredLinks = links.filter(l => l.url && l.url.trim() !== "");
    const profileData = {
      fullName,
      bio,
      avatar,
      socialLinks: filteredLinks,
    };
    saveProfile(profileData);
    setTimeout(() => {
      setSaving(false);
      navigate("/profile");
    }, 1000);
  };

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 bg-background animate-fade-in">
      <Button variant="ghost" onClick={() => navigate("/settings")} className="mb-4">&larr; Back to Settings</Button>
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <Input value={fullName} onChange={e => setFullName(e.target.value)} maxLength={50} required />
          </div>
          <div>
            <label className="block font-medium mb-1">Profile Image</label>
            <div className="flex items-center space-x-4">
              <Avatar className="size-16 border">
                <AvatarImage src={avatar} alt="avatar" />
                <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <Input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Bio</label>
            <Textarea value={bio} onChange={e => setBio(e.target.value)} rows={4} maxLength={300} className="resize-none" />
            <div className="text-xs text-muted-foreground mt-1">{bio.length}/300</div>
          </div>
          <Separator />
          <div>
            <label className="block font-medium mb-2">Links</label>
            <div className="space-y-2 mb-2">
              {links.map((link, idx) => {
                const Icon = link.icon || LinkIcon;
                return (
                  <div key={idx} className="flex items-center space-x-2">
                    <Icon className="size-5 text-muted-foreground" />
                    {link.isSocial ? (
                      <Input
                        placeholder={SOCIAL_PLATFORMS.find(p => p.key === link.platform)?.placeholder}
                        value={link.url}
                        onChange={e => handleLinkChange(idx, "url", e.target.value)}
                        className="flex-1"
                      />
                    ) : (
                      <>
                        <Input
                          placeholder="Label"
                          value={link.label}
                          onChange={e => handleLinkChange(idx, "label", e.target.value)}
                          className="w-32"
                        />
                        <Input
                          placeholder="URL"
                          value={link.url}
                          onChange={e => handleLinkChange(idx, "url", e.target.value)}
                          className="flex-1"
                        />
                        <Button type="button" variant="destructive" size="icon" onClick={() => handleRemoveLink(idx)}>-</Button>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
            <div className="flex items-center space-x-2">
              <LinkIcon className="size-5 text-muted-foreground" />
              <Input
                placeholder="Label"
                value={newLink.label}
                onChange={e => setNewLink(l => ({ ...l, label: e.target.value }))}
                className="w-32"
              />
              <Input
                placeholder="URL"
                value={newLink.url}
                onChange={e => setNewLink(l => ({ ...l, url: e.target.value }))}
                className="flex-1"
              />
              <Button type="button" variant="outline" size="icon" onClick={handleAddLink}>+</Button>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <Button type="submit" disabled={saving} className="w-full mt-4">
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSettings; 