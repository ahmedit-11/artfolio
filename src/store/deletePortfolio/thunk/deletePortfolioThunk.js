import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePortfolioThunk = createAsyncThunk("deletePortfolioThunk", async (portfolioId) => {
    try {
        const response = await axios.delete(`/projects/${portfolioId}`);
        return response.data;
    } catch (error) {
        console.error("Delete portfolio error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
