import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getChatUsersThunk = createAsyncThunk("users/getChatUsers", async (params = {}) => {
    try {
        const response = await axios.get("/users", { params });
        
        // Handle paginated response structure
        if (response.data && response.data.data) {
            return {
                users: response.data.data,
                pagination: {
                    current_page: response.data.current_page,
                    total: response.data.total,
                    per_page: response.data.per_page
                }
            };
        }
        
        // Fallback for direct array response
        return {
            users: Array.isArray(response.data) ? response.data : [],
            pagination: null
        };
    } catch (error) {
        console.error("Get chat users error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
