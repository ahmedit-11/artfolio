import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCommentThunk = createAsyncThunk("addCommentThunk", async ({ projectId, content }) => {
    try {
        const response = await axios.post(`/projects/${projectId}/comments`, {
            content
        });
        return response.data;
    } catch (error) {
        console.error("Add comment error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
