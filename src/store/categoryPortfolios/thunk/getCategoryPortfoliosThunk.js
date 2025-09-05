import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCategoryPortfoliosThunk = createAsyncThunk("getCategoryPortfoliosThunk", async (categorySlug) => {
    try {
        const response = await axios.get(`/categories/${categorySlug}/projects`);
        // Handle Laravel API response structure - return data array if it exists, otherwise return response.data
        return response.data.data || response.data;
    } catch (error) {
        console.error("Get category portfolios error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
