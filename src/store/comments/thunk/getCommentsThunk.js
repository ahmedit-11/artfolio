import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCommentsThunk = createAsyncThunk("comments/getComments", async (projectSlug) => {
    try {
        const response = await axios.get(`/projects/${projectSlug}/comments`);
        return {
            ...response.data,
            projectId: projectSlug
        };
    } catch (error) {
        console.error("Get comments error:", error);
        return Promise.reject(error.response?.data || error.message);
    }
});
