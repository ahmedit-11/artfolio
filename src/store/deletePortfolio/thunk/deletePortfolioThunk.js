import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deletePortfolioThunk = createAsyncThunk("deletePortfolioThunk", async (portfolioSlug) => {
    try {
        const response = await axios.delete(`/projects/${portfolioSlug}`);
        return { portfolioSlug, ...response.data };
    } catch (error) {
        console.error("Delete portfolio error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        
        // Handle specific error cases
        if (error.response?.status === 404) {
            throw new Error("Portfolio not found. It may have already been deleted.");
        } else if (error.response?.status === 403) {
            throw new Error("You don't have permission to delete this portfolio.");
        } else if (error.response?.status === 500) {
            const errorMessage = error.response?.data?.message || "Server error occurred while deleting portfolio.";
            throw new Error(errorMessage);
        }
        
        throw new Error(error.response?.data?.message || error.message || "Failed to delete portfolio");
    }
});
