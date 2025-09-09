import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLikedUsersThunk = createAsyncThunk("social/getLikedUsers", async (projectId) => {
    try {
        const response = await axios.get(`/projects/${projectId}/likes/users`);
        console.log("Get liked users response:", response.data);
        
        return {
            ...response.data,
            projectId
        };
    } catch (error) {
        console.error("Get liked users error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
