import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllTagsThunk = createAsyncThunk("getAllTagsThunk", async () => {
    try {
        const response = await axios.get("/tags");
        return response.data;
    } catch (error) {
        console.error("Get tags error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
