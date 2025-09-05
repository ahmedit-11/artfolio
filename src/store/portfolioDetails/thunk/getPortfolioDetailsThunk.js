import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPortfolioDetailsThunk = createAsyncThunk("getPortfolioDetailsThunk", async (slug) => {
    try {
        // Use the public route that accepts slug for portfolio details
        const response = await axios.get(`/projects/${slug}`);
        return response.data;
    } catch (error) {
        console.error("Portfolio details fetch error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
