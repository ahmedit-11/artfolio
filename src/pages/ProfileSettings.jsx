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
import { useDispatch, useSelector } from "react-redux";
import { updateProfileThunk } from "@/store/updateProfile/thunk/updateProfilethunk";
import { getCurrentUserThunk } from "@/store/currentUser/thunk/getCurrentUserThunk";
import { toast } from "react-toastify";
import { getProfileImageUrl } from "@/utils/mediaUtils";
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

// Note: Social links functionality temporarily disabled until backend supports it

const ProfileSettings = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.updateProfile);
  const { currentUser, loading: userLoading } = useSelector(state => state.currentUser);
  
  useEffect(() => {
    dispatch(getCurrentUserThunk());
  }, [dispatch]);

  // Initialize form fields - will be updated when currentUser loads
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [profilePictureFile, setProfilePictureFile] = useState(null);
  
  // Update form fields when currentUser data is loaded
  useEffect(() => {
    if (currentUser) {
      const fullImageUrl = getProfileImageUrl(currentUser.profile_picture);
      setFullName(currentUser.name || "");
      setEmail(currentUser.email || "");
      setBio(currentUser.bio || "");
      setAvatar(fullImageUrl || "");
    }
  }, [currentUser, userLoading]);
  const [links, setLinks] = useState(() => {
    // Start with social platforms (empty for now)
    const social = SOCIAL_PLATFORMS.map(p => ({
      platform: p.key,
      label: p.label,
      icon: p.icon,
      url: "",
      isSocial: true,
    }));
    return social;
  });
  const [newLink, setNewLink] = useState({ label: "", url: "" });
  // Remove local saving state since we use Redux loading state

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
      setProfilePictureFile(file);
      const reader = new FileReader();
      reader.readAsDataURL(file); // Turns the image into a visual (actual image so the user see it).
      reader.onload = ev => setAvatar(ev.target.result); //Get excuted after the reading is done
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      toast.error("Full Name cannot be empty");
      return;
    }
    
    // Create FormData for multipart/form-data request
    const formData = new FormData();
    formData.append('name', fullName.trim());
    formData.append('email', email.trim()); // Allow user to change email
    formData.append('bio', bio.trim());
    
    // Add profile picture if a new file was selected
    if (profilePictureFile) {
      formData.append('profile_picture', profilePictureFile);
    }
    
    try {
      const result = await dispatch(updateProfileThunk(formData));
      
      if (updateProfileThunk.fulfilled.match(result)) {
        toast.success("Profile updated successfully!");
        // Refresh current user data to reflect changes
        dispatch(getCurrentUserThunk());
        navigate("/profile");
      } else {
        // Handle error from thunk
        const errorMessage = result.payload || "Failed to update profile";
        toast.error(errorMessage);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  // Show loading state while fetching user data
  if (userLoading) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8 bg-background animate-fade-in">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">&larr; Back to Settings</Button>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading profile data...</div>
          </div>
        </Card>
      </div>
    );
  }

  // Debug: Show current state
  if (!currentUser) {
    return (
      <div className="container max-w-2xl mx-auto px-4 py-8 bg-background animate-fade-in">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">&larr; Back to Settings</Button>
        <Card className="p-6">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="text-center py-8">
            <div className="text-muted-foreground mb-4">No user data available</div>
            <Button onClick={() => dispatch(getCurrentUserThunk())}>Retry Loading</Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto px-4 py-8 bg-background animate-fade-in">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4">&larr; Back to Settings</Button>
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <Input 
              value={fullName} 
              onChange={e => setFullName(e.target.value)} 
              placeholder="Enter your full name"
              maxLength={255} 
              required 
              disabled={userLoading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email Address</label>
            <Input 
              type="email"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="Enter your email address"
              maxLength={255} 
              required 
              disabled={userLoading}
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Profile Image</label>
            <div className="flex items-center hover:cursor_click space-x-4">
              <Avatar className="size-16  border">
                <AvatarImage 
                  src={avatar} 
                  alt="avatar"
                  className="object-cover object-center"
                  style={{ imageRendering: 'crisp-edges' }}
                />
                <AvatarFallback>{fullName.charAt(0)}</AvatarFallback>
              </Avatar>
              <Input type="file" accept="image/*" onChange={handleAvatarChange} />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-1">Bio</label>
            <Textarea 
              value={bio} 
              onChange={e => setBio(e.target.value)} 
              placeholder="Tell us about yourself..."
              rows={4} 
              maxLength={1000} 
              className="resize-none"
              disabled={userLoading}
            />
            <div className="text-xs text-muted-foreground mt-1">{bio.length}/300</div>
          </div>
          {/* Social links section temporarily hidden until backend supports it */}
          {false && (
            <>
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
            </>
          )}
          {error && <div className="text-red-500 text-sm">{typeof error === 'string' ? error : 'An error occurred'}</div>}
          <Button type="submit" disabled={loading || userLoading} className="w-full mt-4">
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSettings; 