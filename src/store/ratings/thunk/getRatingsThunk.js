import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getRatingsThunk = createAsyncThunk(
  "ratings/getRatings",
  async (projectSlug, { getState }) => {
    try {
      const token = Cookies.get("token");
      const endpoint = token 
        ? `/projects/${projectSlug}/ratings`
        : `/projects/${projectSlug}/public/ratings`;
      
      const response = await axios.get(endpoint);
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
      console.error("Error response:", error.response?.data);
      console.error("Error status:", error.response?.status);
      return Promise.reject(error.response?.data || error.message);
    }
  }
);
