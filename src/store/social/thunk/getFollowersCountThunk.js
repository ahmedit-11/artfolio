import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFollowersCountThunk = createAsyncThunk("social/getFollowersCount", async (userId) => {
    try {
        const response = await axios.get(`/users/${userId}/followers-count`);
        console.log("Get followers count response:", response.data);
        return response.data;
    } catch (error) {
        console.error("Get followers count error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
