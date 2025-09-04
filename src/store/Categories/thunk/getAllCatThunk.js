import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllCatThunk = createAsyncThunk("getAllCatThunk", async () => {
    try {
        const response = await axios.get("/categories");
        // Handle Laravel API response structure - return data array if it exists, otherwise return response.data
        return response.data.data || response.data;
    } catch (error) {
        console.error("Get categories error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});