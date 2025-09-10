import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addTagToProjectThunk = createAsyncThunk(
  "tags/addTagToProject",
  async ({ projectId, tagName }) => {
    try {
      const response = await axios.post(`/projects/${projectId}/tags`, {
        tag_name: tagName
      });
      console.log(`Successfully created and added tag: ${tagName}`);
      return response.data;
    } catch (error) {
      console.error("Add tag to project error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      return Promise.reject(error.response?.data || error.message);
    }
  }
);
