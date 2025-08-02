import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";

/*
  ============================
  CreatePortfolio Page
  ============================
  Purpose:
    Let creators compose a new portfolio entry via form fields that mirror
    the data structure displayed on PortfolioDetail & cards.

  NOTE: No backend yet. Submit handler just prints captured data to console.
  Wherever you see `// TODO:` comments provide the place to integrate API calls later.
*/

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
  React.useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);
  const navigate = useNavigate();

  // Core form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null); // File object
  const [coverPreview, setCoverPreview] = useState(null);
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

  // Submit (for now just logs)
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      title,
      description,
      coverImage, // In real API send presigned upload or multipart
      tags: selectedTags,
      media: mediaItems,
      createdAt: new Date().toISOString(),
    };

    console.log("CreatePortfolio payload =>", payload);

    // TODO: Replace with POST /api/portfolios when backend is ready.
    // Example:
    // const formData = new FormData();
    // ...append each field & file
    // await fetch("/api/portfolios", { method: "POST", body: formData });

    // For now simulate success and redirect back or to detail page.
    navigate(-1);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-background to-secondary/30 animate-fade-in">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold font-quicksand mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-700">
            Create Portfolio
          </span>
        </h1>

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
                <span
                  key={tag}
                  className="px-3 py-1 bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 rounded-full text-sm flex items-center gap-1"
                >
                  {tag}
                  <X
                    className="size-3 cursor-pointer"
                    onClick={() => toggleTag(tag)}
                  />
                </span>
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
