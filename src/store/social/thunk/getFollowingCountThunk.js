import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getFollowingCountThunk = createAsyncThunk("social/getFollowingCount", async (userId) => {
    try {
        const isAuthenticated = !!Cookies.get('token');
        const endpoint = isAuthenticated 
            ? `/users/${userId}/following-count`
            : `/users/${userId}/public/following-count`;
            
        const response = await axios.get(endpoint);
       
        return response.data;
    } catch (error) {
        console.error("Get following count error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
