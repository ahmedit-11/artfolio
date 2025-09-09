import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCommentThunk = createAsyncThunk("comments/deleteComment", async ({ commentId }) => {
    try {
        const response = await axios.delete(`/comments/${commentId}`);
        return { commentId, ...response.data };
    } catch (error) {
        console.error("Delete comment error:", error);
        return Promise.reject(error.response?.data || error.message);
    }
});
