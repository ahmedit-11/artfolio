import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const rateProjectThunk = createAsyncThunk("ratings/rateProject", async ({ projectSlug, rating }) => {
    try {
        const response = await axios.post(`/projects/${projectSlug}/rate`, { rating });
        
        return {
            projectId: projectSlug,
            rating: rating,
            average_rating: response.data.average_rating,
            ratings_count: response.data.ratings_count
        };
    } catch (error) {
        console.error("Rate project error:", error);
        return Promise.reject(error.response?.data?.message || error.message);
    }
});
