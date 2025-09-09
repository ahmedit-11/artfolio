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
import { updatePortfolioThunk } from "../store/updatePortfolio/thunk/updatePortfolioThunk";
import { getAllTagsThunk } from "../store/tags/thunk/getAllTagsThunk";
import { createTagThunk } from "../store/tags/thunk/createTagThunk";
import { getUserPortfoliosThunk } from "../store/userPortfolios/thunk/getUserPortfoliosThunk";
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

const EditPortfolio = () => {
  useScrollToTop();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  
  const { categories } = useSelector(state => state.categories);
  const { tags } = useSelector(state => state.tags);
  const { data: userPortfolios, loading: portfoliosLoading } = useSelector(state => state.userPortfolios);
  const { loading: updateLoading } = useSelector(state => state.updatePortfolio);
  const { currentUser } = useSelector(state => state.currentUser);

  // Core form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [mediaItems, setMediaItems] = useState([]);
  const [removeMediaIds, setRemoveMediaIds] = useState([]);

  // Find portfolio from userPortfolios
  const currentPortfolio = userPortfolios?.find(portfolio => portfolio.id == id);

  // Load initial data
  useEffect(() => {
    dispatch(getAllCatThunk());
    dispatch(getAllTagsThunk());
    // Get current user's portfolios - no userId needed for own portfolios
    if (currentUser?.id) {
      dispatch(getUserPortfoliosThunk(currentUser.id));
    }
  }, [dispatch, currentUser?.id]);

  // Populate form when portfolio data loads
  useEffect(() => {
    if (currentPortfolio) {
      setTitle(currentPortfolio.title || "");
      setDescription(currentPortfolio.description || "");
      
      // Set category
      if (currentPortfolio.categories && currentPortfolio.categories.length > 0) {
        setSelectedCategory(currentPortfolio.categories[0]);
      }
      
      // Set tags
      if (currentPortfolio.tags && currentPortfolio.tags.length > 0) {
        setSelectedTags(currentPortfolio.tags.map(tag => tag.name || tag));
      }
      
      // Set media - transform existing media to match new media item structure
      if (currentPortfolio.media && currentPortfolio.media.length > 0) {
        const transformedMedia = currentPortfolio.media.map((media, index) => {
          const fileType = media.file_type?.startsWith('image/') ? 'image' : 
                          media.file_type?.startsWith('video/') ? 'video' :
                          media.file_type?.startsWith('audio/') ? 'audio' : 'file';
          
          // Create user-friendly display name
          const displayName = `${fileType.charAt(0).toUpperCase() + fileType.slice(1)} ${index + 1}`;
          
          return {
            id: media.id,
            type: fileType,
            value: {
              name: displayName,
              isExisting: true,
              originalMedia: media
            }
          };
        });
        setMediaItems(transformedMedia);
        
        // Set cover image if exists
        if (currentPortfolio.cover_image) {
          setCoverPreview(currentPortfolio.cover_image);
        }
      }
    }
  }, [currentPortfolio]);

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

  const removeExistingMedia = (mediaId) => {
    setRemoveMediaIds(prev => [...prev, mediaId]);
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Step 1: Create tags dynamically and get their IDs using Redux
      const tagIds = [];
      if (selectedTags.length > 0) {
        for (const tagName of selectedTags) {
          const existingTag = tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
          
          if (existingTag) {
            tagIds.push(existingTag.id);
          } else {
            try {
              const tagResult = await dispatch(createTagThunk({ name: tagName }));
              if (createTagThunk.fulfilled.match(tagResult) && tagResult.payload.tag) {
                tagIds.push(tagResult.payload.tag.id);
              }
            } catch (error) {
             
            }
          }
        }
      }

      // Step 2: Handle potential slug conflicts by modifying title if needed
      let finalTitle = title;
      
      // Check if title changed from original
      if (currentPortfolio.title !== title) {
        // If title changed, we might need to handle slug conflicts
        // The backend will generate slug from title, so we can append timestamp if needed
        const titleExists = userPortfolios?.some(p => 
          p.id !== parseInt(id) && 
          p.title.toLowerCase() === title.toLowerCase()
        );
        
        if (titleExists) {
          // Append a small identifier to make it unique
          const timestamp = Date.now().toString().slice(-4);
          finalTitle = `${title} ${timestamp}`;
        }
      }

      // Step 3: Create FormData for portfolio update
      const formData = new FormData();
      
      // Add basic fields
      formData.append('title', finalTitle);
      formData.append('description', description);
      
      // Backend expects category_ids as array
      if (selectedCategory?.id) {
        formData.append('category_ids[]', selectedCategory.id);
      }
      
      // Add the created tag IDs
      tagIds.forEach(tagId => {
        formData.append('tag_ids[]', tagId);
      });
      
      // Add new cover image if selected
      if (coverImage) {
        formData.append('cover_image', coverImage);
      }
      
      // Add new media files (only actual File objects, not existing media)
      const fileItems = mediaItems.filter(item => item.value && item.value instanceof File && !item.value.isExisting);
      fileItems.forEach((item) => {
        formData.append('new_media[]', item.value);
      });

      // Add media IDs to remove
      removeMediaIds.forEach(mediaId => {
        formData.append('remove_media_ids[]', mediaId);
      });

      // Step 4: Submit the portfolio update
      const result = await dispatch(updatePortfolioThunk({ id, formData }));
      
      if (updatePortfolioThunk.fulfilled.match(result)) {
        toast.success("Portfolio updated successfully!");
        navigate("/profile");
      } else {
        const errorMessage = result.payload || "Failed to update portfolio. Please try again.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Update portfolio error:", error);
      toast.error("An error occurred while updating portfolio.");
    }
  };

  // Loading state
  if (portfoliosLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="size-6 animate-spin text-purple-600" />
          <span className="text-lg">Loading portfolio...</span>
        </div>
      </div>
    );
  }

  // No portfolio found
  if (!currentPortfolio) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-muted-foreground mb-4">Portfolio not found</p>
          <Button onClick={() => navigate("/profile")}>
            Back to Profile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-background animate-fade-in">
      <div className="container max-w-4xl mx-auto px-4">
        <PageTitle subtitle="Update your portfolio with new content and information" className="mb-8">
          Edit Portfolio
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
              <span>{coverImage ? "Change Image" : "Upload New Image"}</span>
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

          {/* Existing Media */}
          {currentPortfolio.media && currentPortfolio.media.length > 0 && (
            <Card className="p-6 space-y-4">
              <h2 className="font-semibold text-lg">Current Media</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPortfolio.media
                  .filter(media => !removeMediaIds.includes(media.id))
                  .map((media) => (
                  <div key={media.id} className="relative border rounded-lg p-4">
                    <Button
                      type="button"
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2"
                      onClick={() => removeExistingMedia(media.id)}
                    >
                      <X className="size-4" />
                    </Button>
                    {media.file_type && media.file_type.startsWith('image/') ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000'}/storage/${media.file_path}`}
                        alt="Media"
                        className="w-full h-32 object-cover rounded"
                      />
                    ) : (
                      <div className="w-full h-32 bg-muted rounded flex items-center justify-center">
                        <span className="text-sm text-muted-foreground">
                          {media.file_type || 'Media File'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* New Media Items */}
          <Card className="p-6 space-y-4">
            <h2 className="font-semibold text-lg">Add New Media</h2>
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
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => document.getElementById(`file-input-${item.id}`).click()}
                            className="bg-purple-50 text-purple-700 hover:bg-purple-100"
                          >
                            Choose File
                          </Button>
                          <span className="text-sm text-muted-foreground">
                            {item.value?.name ? item.value.name : "No file chosen"}
                          </span>
                        </div>
                        <input
                          id={`file-input-${item.id}`}
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
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            
                            handleMediaChange(item.id, file || null);
                          }}
                          className="hidden"
                        />
                      </div>
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
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2 className="size-4 mr-2 animate-spin" />
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

export default EditPortfolio;
