import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserPortfoliosThunk = createAsyncThunk("getUserPortfoliosThunk", async (userId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`/users/${userId}/projects`);
        
        // Handle the new API response structure
        if (response.data && response.data.success) {
            return response.data.projects;
        }
        
        // Fallback for other response formats
        return response.data.data || response.data;
    } catch (error) {
        console.error("Get user portfolios error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        
        // Handle rate limiting with proper error structure
        if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            console.warn(`Rate limited on portfolios. Retrying after ${retryAfter} seconds...`);
            
            return rejectWithValue({
                message: `Too many requests. Please wait ${retryAfter} seconds and try again.`,
                retryAfter: retryAfter,
                isRateLimit: true
            });
        }
        
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch user portfolios");
    }
});
