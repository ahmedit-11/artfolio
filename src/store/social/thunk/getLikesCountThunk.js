import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getLikesCountThunk = createAsyncThunk("social/getLikesCount", async (projectId) => {
    try {
        const response = await axios.get(`/projects/${projectId}/likes/count`);
        console.log("Get likes count response:", response.data);
        
        return {
            ...response.data,
            projectId
        };
    } catch (error) {
        console.error("Get likes count error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
