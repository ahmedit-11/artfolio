import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getFollowStatusThunk = createAsyncThunk("social/getFollowStatus", async (userId) => {
    try {
        const response = await axios.get(`/users/${userId}/follow-status`);
       
        return response.data;
    } catch (error) {
        console.error("Get follow status error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
