import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const removeTagFromProjectThunk = createAsyncThunk(
  "tags/removeTagFromProject",
  async ({ projectSlug, tagId }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/projects/${projectSlug}/tags/${tagId}`);
      return response.data;
    } catch (error) {
      console.error("Remove tag from project error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      return rejectWithValue(error.response?.data?.message || "Failed to remove tag from project");
    }
  }
);
