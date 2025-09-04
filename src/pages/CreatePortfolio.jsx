import React, { useEffect, useState } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X, UploadCloud, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";
import Tag from "@/components/ui/tag";
import { useDispatch, useSelector } from "react-redux";
import { getAllCatThunk } from "../store/Categories/thunk/getAllCatThunk";
import { createPortfolioThunk } from "../store/createPortfolio/thunk/createPortfolioThunk";
import { getAllTagsThunk } from "../store/tags/thunk/getAllTagsThunk";
import { createTagThunk } from "../store/tags/thunk/createTagThunk";
import {toast} from 'react-toastify';

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

const CreatePortfolio = () => {
  // Always scroll to top on mount
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.categories)
  const { tags } = useSelector(state => state.tags)
  const {loading,data,error} = useSelector(state=>state.createPortfolio)
useEffect(()=>{
  dispatch(getAllCatThunk())
  dispatch(getAllTagsThunk())
},[dispatch])
  // Core form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null); // File object
  const [coverPreview, setCoverPreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");

  // Media items array: { id, type, value } where value is file or text
  const [mediaItems, setMediaItems] = useState([]);

  // Handle cover image selection
  const handleCoverSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setCoverImage(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  // Category helpers
  const selectCategory = (category) => {
    setSelectedCategory(category);
    setShowCategoryDropdown(false);
  };

  // Tag helpers
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
    }
    setCustomTag("");
  };

  // Media helpers
  const addMediaItem = (type) => {
    setMediaItems((prev) => [
      ...prev,
      {
        id: Date.now(),
        type,
        value: null,
      },
    ]);
  };

  const handleMediaChange = (id, value) => {
    setMediaItems((prev) => prev.map((m) => (m.id === id ? { ...m, value } : m)));
  };

  const removeMediaItem = (id) => {
    setMediaItems((prev) => prev.filter((m) => m.id !== id));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Laravel backend requires at least 1 media file
    const fileItems = mediaItems.filter(item => item.value && item.value instanceof File);
    
    if (fileItems.length === 0) {
      toast.error("Please add at least one media file (image, video, or audio).");
      return;
    }

    try {
      // Step 1: Create tags dynamically and get their IDs using Redux
      const tagIds = [];
      if (selectedTags.length > 0) {
        for (const tagName of selectedTags) {
          // Check if tag already exists in Redux store
          const existingTag = tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
          
          if (existingTag) {
            // Use existing tag ID
            tagIds.push(existingTag.id);
          } else {
            // Try to create new tag using Redux thunk
            try {
              const tagResponse = await dispatch(createTagThunk({ name: tagName }));
              if (tagResponse.payload && tagResponse.payload.tag) {
                tagIds.push(tagResponse.payload.tag.id);
              }
            } catch (error) {
              // Silently skip this tag if creation fails
              console.warn(`Could not create tag: ${tagName}`, error);
            }
          }
        }
      }

      // Step 2: Create FormData for portfolio submission
      const formData = new FormData();
      
      // Add basic fields
      formData.append('title', title);
      formData.append('description', description);
      
      // Backend expects category_ids as array
      if (selectedCategory?.id) {
        formData.append('category_ids[]', selectedCategory.id);
      }
      
      // Add the created tag IDs
      tagIds.forEach(tagId => {
        formData.append('tag_ids[]', tagId);
      });
      
      // Add cover image if selected
      if (coverImage) {
        formData.append('cover_image', coverImage);
      }
      
      // Add required media files (backend requires min:1)
      fileItems.forEach((item) => {
        formData.append('media[]', item.value);
      });


      // Step 3: Submit the portfolio
      const res = await dispatch(createPortfolioThunk(formData));
      
      if (res.payload && res.payload.message === 'Project created successfully!') {
        toast.success("Portfolio created successfully!");
        navigate("/");
      } else {
        toast.error("Failed to create portfolio. Please try again.");
        console.error("Portfolio creation failed:", res);
      }
    } catch (error) {
      console.error("Create portfolio error:", error);
      toast.error("An error occurred while creating portfolio.");
    }
  };

  return (
    <section className="py-12 bg-background  animate-fade-in">
      <div className="container max-w-4xl mx-auto px-4">
        <PageTitle subtitle="Showcase your creative work and build your professional portfolio" className="mb-8">
          Create Portfolio
        </PageTitle>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Title</h2>
          <Input
            placeholder="Enter portfolio title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Card>

        {/* Description */}
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Description</h2>
          <Textarea
            placeholder="Describe your project..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </Card>

        {/* Category Selection */}
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Category</h2>
          <p className="text-sm text-muted-foreground">
            Choose the category that best describes your portfolio
          </p>
          
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              className={cn(
                "w-full justify-between",
                !selectedCategory && "text-muted-foreground"
              )}
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
              {selectedCategory ? selectedCategory.name : "Select a category"}
              <ChevronDown className={cn(
                "size-4 transition-transform",
                showCategoryDropdown && "rotate-180"
              )} />
            </Button>

            {showCategoryDropdown && (
              <div className="absolute top-full left-0 right-0 z-10 mt-1 bg-background border rounded-md shadow-lg max-h-60 overflow-y-auto">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    className={cn(
                      "w-full px-4 py-2 text-left hover:bg-muted transition-colors",
                      selectedCategory?.id === category.id && "bg-muted"
                    )}
                    onClick={() => selectCategory(category)}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {selectedCategory && (
            <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                Selected: {selectedCategory.name}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="ml-auto h-6 w-6 p-0 text-purple-600 hover:text-purple-700"
                onClick={() => setSelectedCategory(null)}
              >
                <X className="size-3" />
              </Button>
            </div>
          )}
        </Card>

        {/* Cover Image */}
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Cover Image</h2>
          {coverPreview && (
            <img
              src={coverPreview}
              alt="Cover preview"
              className="w-full max-h-64 object-cover rounded-lg mb-4"
            />
          )}
          <label className="flex items-center gap-2 cursor-pointer text-purple-600 hover:underline">
            <UploadCloud className="size-4" />
            <span>{coverImage ? "Change Image" : "Upload Image"}</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleCoverSelect} />
          </label>
        </Card>

        {/* Tags */}
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Tags</h2>

          <div className="flex flex-wrap gap-2">
            {commonTags.map((tag) => (
              <Button
                key={tag}
                type="button"
                size="sm"
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-2 mt-4">
            <Input
              placeholder="Add custom tag"
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addCustomTag();
                }
              }}
            />
            <Button type="button" onClick={addCustomTag} size="icon">
              <Plus className="size-4" />
            </Button>
          </div>

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedTags.map((tag) => (
                <Tag
                  key={tag}
                  removable
                  onRemove={() => toggleTag(tag)}
                >
                  {tag}
                </Tag>
              ))}
            </div>
          )}
        </Card>

        {/* Media Items */}
        <Card className="p-6 space-y-4">
          <h2 className="font-semibold text-lg">Media</h2>
          <div className="flex gap-2 flex-wrap">
            {[
              { label: "Image", type: "image", accept: "image/*" },
              { label: "Video", type: "video", accept: "video/*" },
              { label: "Audio", type: "audio", accept: "audio/*" },
              { label: "3D", type: "model", accept: ".glb,.gltf,.obj,.fbx" },
              { label: "Text", type: "text" },
            ].map((opt) => (
              <Button
                key={opt.type}
                type="button"
                variant="outline"
                size="sm"
                onClick={() => addMediaItem(opt.type)}
              >
                + {opt.label}
              </Button>
            ))}
          </div>

          {mediaItems.length > 0 && (
            <div className="space-y-4 mt-4">
              {mediaItems.map((item) => (
                <Card key={item.id} className="p-4 relative space-y-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    className="absolute top-2 right-2"
                    onClick={() => removeMediaItem(item.id)}
                  >
                    <X className="size-4" />
                  </Button>
                  <p className="text-sm font-medium capitalize">{item.type}</p>

                  {item.type === "text" ? (
                    <Textarea
                      placeholder="Enter text content..."
                      value={item.value || ""}
                      onChange={(e) => handleMediaChange(item.id, e.target.value)}
                    />
                  ) : (
                    <input
                      type="file"
                      accept={
                        item.type === "image"
                          ? "image/*"
                          : item.type === "video"
                          ? "video/*"
                          : item.type === "audio"
                          ? "audio/*"
                          : item.type === "model"
                          ? ".glb,.gltf,.obj,.fbx"
                          : "*/*"
                      }
                      onChange={(e) => handleMediaChange(item.id, e.target.files?.[0] || null)}
                      className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                    />
                  )}
                </Card>
              ))}
            </div>
          )}
        </Card>

        {/* Submit */}
        <div className="flex justify-end">
          <Button type="submit">Create Portfolio</Button>
        </div>
      </form>
      </div>
    </section>
  );
};

export default CreatePortfolio;
