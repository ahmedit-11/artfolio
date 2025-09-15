import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

export const getFollowersCountThunk = createAsyncThunk("social/getFollowersCount", async (userId) => {
    try {
        const isAuthenticated = !!Cookies.get('token');
        const endpoint = isAuthenticated 
            ? `/users/${userId}/followers-count`
            : `/users/${userId}/public/followers-count`;
            
        const response = await axios.get(endpoint);
        
        return response.data;
    } catch (error) {
        console.error("Get followers count error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
