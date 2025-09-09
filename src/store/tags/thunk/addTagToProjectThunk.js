import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTagToProjectThunk = createAsyncThunk(
  "tags/addTagToProject",
  async ({ projectSlug, tagName }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/projects/${projectSlug}/tags`, {
        tag_name: tagName
      });
      return response.data;
    } catch (error) {
      console.error("Add tag to project error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      return rejectWithValue(error.response?.data?.message || "Failed to add tag to project");
    }
  }
);
