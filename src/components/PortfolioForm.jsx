// PortfolioForm.jsx
// Displays a form for creating or editing a portfolio item, with fields for image upload, title, description, and tags.
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

// PortfolioForm component renders a form for creating or editing a portfolio item
const PortfolioForm = ({
  className,
  initialData = {
    title: "",
    description: "",
    image: null,
    tags: [],
  },
  onSubmit = () => {},
  onCancel = () => {},
}) => {
  // State for form data and image preview
  const [formData, setFormData] = useState(initialData);
  const [imagePreview, setImagePreview] = useState(initialData.image);
  const [newTag, setNewTag] = useState("");

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle tag addition
  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  // Handle tag removal
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-6", className)}>
      <div className="space-y-2">
        <Label htmlFor="image">Portfolio Image</Label>
        <div className="relative aspect-[16/9] overflow-hidden rounded-xl border-2 border-dashed border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
          {imagePreview ? (
            <div className="relative w-full h-full">
              <img
                src={imagePreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setImagePreview(null);
                  setFormData((prev) => ({ ...prev, image: null }));
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
                Click to upload image
              </span>
              <input
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter portfolio title"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter portfolio description"
          rows={4}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <div className="flex gap-2">
          <Input
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            placeholder="Add a tag"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button type="button" onClick={handleAddTag}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.tags.map((tag) => (
            <div
              key={tag}
              className="flex items-center gap-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-purple-900 dark:hover:text-purple-100"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Portfolio</Button>
      </div>
    </form>
  );
};

export default PortfolioForm; 