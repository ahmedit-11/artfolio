import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addCommentThunk = createAsyncThunk("comments/addComment", async ({ projectSlug, content }) => {
    try {
        const response = await axios.post(`/projects/${projectSlug}/comments`, {
            content
        });
        return response.data;
    } catch (error) {
        console.error("Add comment error:", error);
        return Promise.reject(error.response?.data || error.message);
    }
});
