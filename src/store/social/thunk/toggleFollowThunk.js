import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleFollowThunk = createAsyncThunk("social/toggleFollow", async (userId, { getState }) => {
    try {
        const response = await axios.post(`/users/${userId}/toggle-follow`);
        console.log("Toggle follow response:", response.data);
        
        // Return the response data with userId for state updates
        return {
            ...response.data,
            userId
        };
    } catch (error) {
        console.error("Toggle follow error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
