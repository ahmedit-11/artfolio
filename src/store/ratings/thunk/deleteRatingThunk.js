import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteRatingThunk = createAsyncThunk("ratings/deleteRating", async (projectSlug, { getState }) => {
    try {
        const response = await axios.delete(`/projects/${projectSlug}/delete-rating`);
        
        // Get current user ID from auth state
        const state = getState();
        const currentUserId = state.currentUser?.user?.id;
        
        return {
            projectId: projectSlug,
            userId: currentUserId,
            average_rating: response.data.average_rating,
            ratings_count: response.data.ratings_count
        };
    } catch (error) {
        console.error("Delete rating error:", error);
        return Promise.reject(error.response?.data?.message || error.message);
    }
});
