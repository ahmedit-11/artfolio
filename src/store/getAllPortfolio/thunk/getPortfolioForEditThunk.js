import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPortfolioForEditThunk = createAsyncThunk("getPortfolioForEditThunk", async (id) => {
    try {
        // Use authenticated apiResource route for getting project by ID for editing
        // This requires authentication and returns full project data
        const response = await axios.get(`/projects/${id}`);
        return response.data;
    } catch (error) {
        console.error("Portfolio fetch for edit error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
