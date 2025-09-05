import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCommentThunk = createAsyncThunk("deleteCommentThunk", async ({ commentId }) => {
    try {
        const response = await axios.delete(`/comments/${commentId}`);
        return { commentId, ...response.data };
    } catch (error) {
        console.error("Delete comment error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
