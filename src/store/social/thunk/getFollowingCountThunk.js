import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFollowingCountThunk = createAsyncThunk("social/getFollowingCount", async (userId) => {
    try {
        const response = await axios.get(`/users/${userId}/following-count`);
       
        return response.data;
    } catch (error) {
        console.error("Get following count error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
