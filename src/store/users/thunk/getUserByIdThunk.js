import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserByIdThunk = createAsyncThunk("users/getUserById", async (userId, { rejectWithValue }) => {
    try {
        // Use the new dedicated public endpoint for getting user by ID
        const response = await axios.get(`/users/${userId}/public/profile`);
        
        if (response.data && response.data.success && response.data.user) {
            return { user: response.data.user };
        }
        
        throw new Error(`User with ID ${userId} not found`);
        
    } catch (error) {
        console.error("Get user by ID error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        
        // Handle rate limiting with exponential backoff
        if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'] || 5;
            console.warn(`Rate limited. Retrying after ${retryAfter} seconds...`);
            
            return rejectWithValue({
                message: `Too many requests. Please wait ${retryAfter} seconds and try again.`,
                retryAfter: retryAfter,
                isRateLimit: true
            });
        }
        
        return rejectWithValue(error.response?.data?.message || error.message || "Failed to fetch user");
    }
});
