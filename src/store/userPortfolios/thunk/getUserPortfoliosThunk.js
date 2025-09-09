import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserPortfoliosThunk = createAsyncThunk("getUserPortfoliosThunk", async (userId) => {
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
        return Promise.reject(error.response?.data || error.message);
    }
});
