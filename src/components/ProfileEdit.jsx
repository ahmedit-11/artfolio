// ProfileEdit.jsx
// Displays a form for editing a user's profile information, including avatar, name, bio, location, email, and website.
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

// ProfileEdit component renders a form for editing a user's profile information
const ProfileEdit = ({
  className,
  initialData = {
    name: "",
    bio: "",
    location: "",
    email: "",
    website: "",
    avatar: null,
  },
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  // State for form data and avatar preview
  const [formData, setFormData] = useState(initialData);
  const [avatarPreview, setAvatarPreview] = useState(initialData.avatar);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, avatar: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <Label htmlFor="avatar">Profile Picture</Label>
        <div className="relative w-32 h-32 overflow-hidden rounded-full border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
          {avatarPreview ? (
            <div className="relative w-full h-full">
              <img
                src={avatarPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setAvatarPreview(null);
                  setFormData((prev) => ({ ...prev, avatar: null }));
                }}
                className="absolute top-2 right-2 p-1 bg-background/80 rounded-full hover:bg-background/90 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>
          ) : (
            <label className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer">
              <Upload className="size-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                Click to upload
              </span>
              <input
                type="file"
                id="avatar"
                name="avatar"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          value={formData.bio}
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
          value={formData.location}
          onChange={handleChange}
          placeholder="Enter your location"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="Enter your website URL"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Changes</Button>
      </div>
    </form>
  );
};

export default ProfileEdit; 