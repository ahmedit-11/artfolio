import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTrendingProjectsThunk = createAsyncThunk(
  "trending/getTrendingProjects",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/trending-projects");
      return response.data;
    } catch (error) {
      console.error("Get trending projects error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to get trending projects");
    }
  }
);
