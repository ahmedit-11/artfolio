import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUserThunk = createAsyncThunk("currentUser/getCurrentUser", async () => {
    try {
        const response = await axios.get("/user/profile");
        
        // If response has success/message structure, extract the user data
        if (response.data && typeof response.data === 'object') {
            // If it's a success response with user data
            if (response.data.user) {
                return response.data.user;
            }
            // If it's direct user data (no wrapper)
            if (response.data.id && response.data.name) {
                return response.data;
            }
        }
        
        return response.data;
    } catch (error) {
        console.error("Get current user error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
