import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const toggleLikeThunk = createAsyncThunk("social/toggleLike", async (projectSlug) => {
    try {
        const response = await axios.post(`/projects/${projectSlug}/toggle-like`);
        
        // Return the response data with projectSlug for state updates
        return {
            ...response.data,
            projectId: projectSlug
        };
    } catch (error) {
        console.error("Toggle like error:", error);
        return Promise.reject(error.response?.data || error.message);
    }
});
