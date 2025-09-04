import React, { useEffect, useState } from "react";
import { useScrollToTop } from "../utils/scrollToTop";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X, UploadCloud, ChevronDown, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";
import Tag from "@/components/ui/tag";
import { useDispatch, useSelector } from "react-redux";
import { getAllCatThunk } from "../store/Categories/thunk/getAllCatThunk";
import { getAllTagsThunk } from "../store/tags/thunk/getAllTagsThunk";
import { createTagThunk } from "../store/tags/thunk/createTagThunk";
import { getPortfolioByIdThunk } from "../store/getAllPortfolio/thunk/getPortfolioByIdThunk";
import { updatePortfolioThunk } from "../store/updatePortfolio/thunk/updatePortfolioThunk";
import { toast } from 'react-toastify';

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

const UpdatePortfolio = () => {
  // Always scroll to top on mount
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { categories } = useSelector(state => state.categories);
  const { tags } = useSelector(state => state.tags);
  const { portfolioById, loadingOnePortfolio } = useSelector(state => state.getAllPortfolio);
  const { loading: updateLoading } = useSelector(state => state.updatePortfolio);
  
  // Loading states (use Redux loading for update)
  const isLoading = updateLoading;
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  
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

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getAllCatThunk()),
          dispatch(getAllTagsThunk()),
          dispatch(getPortfolioByIdThunk(id))
        ]);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load portfolio data");
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchData();
  }, [dispatch, id]);

  // Populate form when portfolio data is loaded
  useEffect(() => {
    if (portfolioById && portfolioById.id) {
      setTitle(portfolioById.title || "");
      setDescription(portfolioById.description || "");
      
      // Set cover image preview if exists
      if (portfolioById.cover_image) {
        setCoverPreview(portfolioById.cover_image);
      }
      
      // Set selected category
      if (portfolioById.categories && portfolioById.categories.length > 0) {
        setSelectedCategory(portfolioById.categories[0]);
      }
      
      // Set selected tags
      if (portfolioById.tags && portfolioById.tags.length > 0) {
        setSelectedTags(portfolioById.tags.map(tag => tag.name));
      }
      
      // Set existing media items (for display purposes)
      if (portfolioById.media && portfolioById.media.length > 0) {
        const existingMedia = portfolioById.media.map((media, index) => ({
          id: `existing-${index}`,
          type: media.file_type || 'image',
          value: media.file_path,
          isExisting: true
        }));
        setMediaItems(existingMedia);
      }
    }
  }, [portfolioById]);

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
        isExisting: false
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
              const tagResult = await dispatch(createTagThunk({ name: tagName }));
              if (createTagThunk.fulfilled.match(tagResult) && tagResult.payload.tag) {
                tagIds.push(tagResult.payload.tag.id);
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
      formData.append('_method', 'PUT'); // Laravel method spoofing for file uploads
      
      // Backend expects category_ids as array
      if (selectedCategory?.id) {
        formData.append('category_ids[]', selectedCategory.id);
      }
      
      // Add the created tag IDs
      tagIds.forEach(tagId => {
        formData.append('tag_ids[]', tagId);
      });
      
      // Add cover image if selected (new file)
      if (coverImage) {
        formData.append('cover_image', coverImage);
      }
      
      // Add new media files only (not existing ones)
      const newFileItems = mediaItems.filter(item => 
        !item.isExisting && item.value && item.value instanceof File
      );
      
      newFileItems.forEach((item) => {
        formData.append('media[]', item.value);
      });

      // Step 3: Submit the portfolio update using Redux
      const result = await dispatch(updatePortfolioThunk({ id, formData }));
      
      if (updatePortfolioThunk.fulfilled.match(result)) {
        toast.success("Portfolio updated successfully!");
        navigate(`/portfolio/${id}`);
      } else {
        const errorMessage = result.payload || "Failed to update portfolio. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Update portfolio error:", error);
      let message = "An error occurred while updating portfolio.";
      
      if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      
      toast.error(message);
    }
  };

  // Show loading state while fetching portfolio data
  if (isInitialLoading || loadingOnePortfolio) {
    return (
      <section className="py-12 bg-background animate-fade-in">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="flex items-center gap-3">
              <Loader2 className="size-6 animate-spin text-purple-600" />
              <span className="text-lg">Loading portfolio...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error if portfolio not found
  if (!portfolioById || !portfolioById.id) {
    return (
      <section className="py-12 bg-background animate-fade-in">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Portfolio Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The portfolio you're trying to edit could not be found.
            </p>
            <Button onClick={() => navigate("/")}>
              Go Back Home
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-background animate-fade-in">
      <div className="container max-w-4xl mx-auto px-4">
        <PageTitle subtitle="Edit and update your portfolio details" className="mb-8">
          Update Portfolio
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
              <div className="relative">
                <img
                  src={coverPreview}
                  alt="Cover preview"
                  className="w-full max-h-64 object-cover rounded-lg mb-4"
                />
                {coverImage && (
                  <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
                    New Image
                  </div>
                )}
              </div>
            )}
            <label className="flex items-center gap-2 cursor-pointer text-purple-600 hover:underline">
              <UploadCloud className="size-4" />
              <span>{coverImage ? "Change Image" : coverPreview ? "Update Image" : "Upload Image"}</span>
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
            <p className="text-sm text-muted-foreground">
              Add new media files. Existing media will be preserved unless you remove them.
            </p>
            
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
                    
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium capitalize">{item.type}</p>
                      {item.isExisting && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Existing
                        </span>
                      )}
                    </div>

                    {item.isExisting ? (
                      <div className="text-sm text-muted-foreground">
                        Current file: {typeof item.value === 'string' ? item.value.split('/').pop() : 'Unknown'}
                      </div>
                    ) : item.type === "text" ? (
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
          <div className="flex justify-end gap-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate(`/portfolio/${id}`)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update Portfolio"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdatePortfolio;
