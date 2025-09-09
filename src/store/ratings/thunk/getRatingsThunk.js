import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getRatingsThunk = createAsyncThunk(
  "ratings/getRatings",
  async (projectSlug, { rejectWithValue, getState }) => {
    try {
      const response = await axios.get(`/projects/${projectSlug}/ratings`);
      const { auth, ratings } = getState();
      
      // Preserve existing user rating if it's already set for this project
      const existingUserRating = ratings.currentProjectId === projectSlug ? ratings.userRating : null;
      
      return {
        projectId: projectSlug,
        ratings: response.data.ratings || response.data,
        averageRating: response.data.average_rating,
        ratingsCount: response.data.ratings_count,
        currentUserId: auth.user?.id,
        preserveUserRating: existingUserRating
      };
    } catch (error) {
      console.error("Get ratings error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to get ratings");
    }
  }
);
