import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfileThunk = createAsyncThunk("updateProfileThunk", async (formData) => {
    try {
      
        
        // PUT request to update profile - uses authenticated user endpoint
        const response = await axios.post(`/user/profile`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Profile update error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});