import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLikeStatusThunk = createAsyncThunk(
  "social/getLikeStatus",
  async (projectSlug, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`/projects/${projectSlug}`);
      
      // Also dispatch rating data to ratings store
      if (response.data.project.user_rating !== undefined) {
        dispatch({
          type: 'ratings/setUserRatingFromProject',
          payload: {
            projectId: projectSlug,
            userRating: response.data.project.user_rating,
            averageRating: response.data.average_rating,
            ratingsCount: response.data.ratings_count
          }
        });
      }
      
      return {
        projectId: projectSlug,
        isLiked: response.data.project.is_liked_by_current_user,
        likesCount: response.data.project.likes_count
      };
    } catch (error) {
      console.error("Get like status error:", error);
      return rejectWithValue(error.response?.data?.message || "Failed to get like status");
    }
  }
);
