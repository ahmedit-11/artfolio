import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProjectTagsThunk = createAsyncThunk(
  "tags/updateProjectTags",
  async ({ projectSlug, tagIds }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/projects/${projectSlug}/tags`, {
        tag_ids: tagIds
      });
      return response.data;
    } catch (error) {
      console.error("Update project tags error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      return rejectWithValue(error.response?.data?.message || "Failed to update project tags");
    }
  }
);
