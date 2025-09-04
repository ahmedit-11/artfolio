import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updatePortfolioThunk = createAsyncThunk("updatePortfolioThunk", async ({ id, formData }) => {
    try {
        console.log("Updating portfolio with FormData");
        
        // Laravel requires method spoofing for PUT with FormData
        formData.append('_method', 'PUT');
        
        // Use POST with method spoofing for multipart/form-data
        const response = await axios.post(`/projects/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Portfolio update error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});