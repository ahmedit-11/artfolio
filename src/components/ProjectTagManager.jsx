import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import Tag from "@/components/ui/tag";
import { getAllTagsThunk } from "../store/tags/thunk/getAllTagsThunk";
import { addTagToProjectThunk } from "../store/tags/thunk/addTagToProjectThunk";
import { updateProjectTagsThunk } from "../store/tags/thunk/updateProjectTagsThunk";
import { removeTagFromProjectThunk } from "../store/tags/thunk/removeTagFromProjectThunk";
import { getUserPortfoliosThunk } from "../store/userPortfolios/thunk/getUserPortfoliosThunk";
import { getAllPortfolioThunk } from "../store/getAllPortfolio/thunk/getAllPortfolioThunk";
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

const ProjectTagManager = ({ projectId }) => {
  const dispatch = useDispatch();
  const { tags, projectTagLoading, projectTagError } = useSelector(state => state.tags);
  const { data: userPortfolios } = useSelector(state => state.userPortfolios);
  const { currentUser } = useSelector(state => state.currentUser);
  
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");

  // Find current project from userPortfolios
  const currentProject = userPortfolios?.find(portfolio => portfolio.id === projectId);
  const currentTags = currentProject?.tags || [];
  const projectSlug = currentProject?.slug;


  // Don't render if projectId is invalid or project not found
  if (!projectId || !currentProject) {
    return <div className="text-red-500">Error: Project not found</div>;
  }

  useEffect(() => {
    dispatch(getAllTagsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (currentTags.length > 0) {
      setSelectedTags(currentTags.map(tag => tag.name || tag));
    } else {
      setSelectedTags([]);
    }
  }, [currentTags.length]);

  const toggleTag = (tagName) => {
    setSelectedTags((prev) =>
      prev.includes(tagName) 
        ? prev.filter((t) => t !== tagName) 
        : [...prev, tagName]
    );
  };

  const addCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedTags.includes(trimmed)) {
      setSelectedTags((prev) => [...prev, trimmed]);
    }
    setCustomTag("");
  };

  const handleSaveTags = async () => {
    try {
      // Convert tag names to tag IDs
      const tagIds = [];
      
      for (const tagName of selectedTags) {
        // Check if tag exists in Redux store
        const existingTag = tags.find(tag => tag.name.toLowerCase() === tagName.toLowerCase());
        
        if (existingTag) {
          tagIds.push(existingTag.id);
        } else {
          // Create new tag by adding it to the project (backend will create if doesn't exist)
          try {
            const result = await dispatch(addTagToProjectThunk({ 
              projectSlug, 
              tagName 
            }));
            
            if (addTagToProjectThunk.fulfilled.match(result) && result.payload.tag) {
              tagIds.push(result.payload.tag.id);
            }
          } catch (error) {
            console.warn(`Could not create tag: ${tagName}`, error);
          }
        }
      }

      // Update all project tags
      const result = await dispatch(updateProjectTagsThunk({ 
        projectSlug, 
        tagIds 
      }));
      
      if (updateProjectTagsThunk.fulfilled.match(result)) {
        toast.success("Tags updated successfully!");
        // Refresh both user portfolios and main portfolio list
        if (currentUser?.id) {
          dispatch(getUserPortfoliosThunk(currentUser.id));
        }
        dispatch(getAllPortfolioThunk());
      } else {
        toast.error("Failed to update tags. Please try again.");
      }
    } catch (error) {
      console.error("Save tags error:", error);
      toast.error("An error occurred while updating tags.");
    }
  };

  const handleRemoveTag = async (tagName) => {
    // Find tag ID from current tags or Redux store
    const currentTag = currentTags.find(tag => (tag.name || tag) === tagName);
    const storeTag = tags.find(tag => tag.name === tagName);
    const tagId = currentTag?.id || storeTag?.id;

    if (tagId) {
      try {
        const result = await dispatch(removeTagFromProjectThunk({ 
          projectSlug, 
          tagId 
        }));
        
        if (removeTagFromProjectThunk.fulfilled.match(result)) {
          setSelectedTags(prev => prev.filter(t => t !== tagName));
          toast.success("Tag removed successfully!");
          // Refresh portfolio data to show updated tags
          if (currentUser?.id) {
            dispatch(getUserPortfoliosThunk(currentUser.id));
          }
        } else {
          toast.error("Failed to remove tag. Please try again.");
        }
      } catch (error) {
        console.error("Remove tag error:", error);
        toast.error("An error occurred while removing tag.");
      }
    } else {
      // If no ID found, just remove from local state
      setSelectedTags(prev => prev.filter(t => t !== tagName));
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Project Tags Display */}
      {currentTags.length > 0 && (
        <Card className="p-4 space-y-3">
          <h4 className="font-medium text-sm text-muted-foreground">Current Tags</h4>
          <div className="flex flex-wrap gap-2">
            {currentTags.map((tag) => (
              <Tag key={tag.id || tag.name}>
                {tag.name || tag}
              </Tag>
            ))}
          </div>
        </Card>
      )}

      {/* Tag Management */}
      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Manage Tags</h3>
          <Button 
            onClick={handleSaveTags}
            disabled={projectTagLoading}
            size="sm"
          >
            {projectTagLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>

      {/* Common Tags */}
      <div className="flex flex-wrap gap-2">
        {commonTags.map((tag) => (
          <Button
            key={tag}
            type="button"
            size="sm"
            variant={selectedTags.includes(tag) ? "default" : "outline"}
            onClick={() => toggleTag(tag)}
            disabled={projectTagLoading}
          >
            {tag}
          </Button>
        ))}
      </div>

      {/* Custom Tag Input */}
      <div className="flex items-center gap-2">
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
          disabled={projectTagLoading}
        />
        <Button 
          type="button" 
          onClick={addCustomTag} 
          size="icon"
          disabled={projectTagLoading}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium">Selected Tags:</p>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tag) => (
              <Tag
                key={tag}
                removable
                onRemove={() => handleRemoveTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </div>
        </div>
      )}

        {projectTagError && (
          <p className="text-sm text-red-600 dark:text-red-400">
            Error: {projectTagError}
          </p>
        )}
      </Card>
    </div>
  );
};

export default ProjectTagManager;
