import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X, UploadCloud, Save, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Tag from "@/components/ui/tag";

const commonTags = [
  "UI/UX",
  "Illustration",
  "3D",
  "Animation",
  "Photography",
  "Branding",
  "Web Design",
  "Mobile Design",
];

const PortfolioForm = ({ initialData, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCoverImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        coverImage: file,
        coverPreview: URL.createObjectURL(file)
      }));
    }
  };

  const addTag = (tag) => {
    if (!formData.selectedTags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        selectedTags: [...prev.selectedTags, tag]
      }));
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      selectedTags: prev.selectedTags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addCustomTag = () => {
    if (formData.customTag.trim() && !formData.selectedTags.includes(formData.customTag.trim())) {
      addTag(formData.customTag.trim());
      setFormData(prev => ({ ...prev, customTag: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting portfolio:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title *</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Enter portfolio title"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Describe your portfolio..."
              rows={4}
              required
            />
          </div>
        </div>
      </Card>

      {/* Cover Image */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Cover Image</h2>
        <div className="space-y-4">
          {formData.coverPreview ? (
            <div className="relative">
              <img
                src={formData.coverPreview}
                alt="Cover preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setFormData(prev => ({ 
                  ...prev, 
                  coverImage: null, 
                  coverPreview: null 
                }))}
              >
                <X className="size-4" />
              </Button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <UploadCloud className="size-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground mb-4">Upload a cover image for your portfolio</p>
              <input
                type="file"
                accept="image/*"
                onChange={handleCoverImageChange}
                className="hidden"
                id="cover-upload"
              />
              <label htmlFor="cover-upload">
                <Button type="button" variant="outline" asChild>
                  <span>Choose Image</span>
                </Button>
              </label>
            </div>
          )}
        </div>
      </Card>

      {/* Tags */}
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Tags</h2>
        <div className="space-y-4">
          {/* Selected Tags */}
          {formData.selectedTags.length > 0 && (
            <div>
              <p className="text-sm font-medium mb-2">Selected Tags:</p>
              <div className="flex flex-wrap gap-2">
                {formData.selectedTags.map((tag) => (
                  <Tag
                    key={tag}
                    removable
                    onRemove={() => removeTag(tag)}
                  >
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          )}

          {/* Common Tags */}
          <div>
            <p className="text-sm font-medium mb-2">Popular Tags:</p>
            <div className="flex flex-wrap gap-2">
              {commonTags.map((tag) => (
                <Button
                  key={tag}
                  type="button"
                  variant={formData.selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => formData.selectedTags.includes(tag) ? removeTag(tag) : addTag(tag)}
                >
                  {tag}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Tag Input */}
          <div>
            <p className="text-sm font-medium mb-2">Add Custom Tag:</p>
            <div className="flex gap-2">
              <Input
                value={formData.customTag}
                onChange={(e) => setFormData(prev => ({ ...prev, customTag: e.target.value }))}
                placeholder="Enter custom tag"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomTag())}
              />
              <Button type="button" onClick={addCustomTag}>
                <Plus className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* Form Actions */}
      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          <ArrowLeft className="size-4 mr-2" />
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting || !formData.title || !formData.description}>
          <Save className="size-4 mr-2" />
          {isSubmitting ? "Creating..." : "Create Portfolio"}
        </Button>
      </div>
    </form>
  );
};

export default PortfolioForm;
