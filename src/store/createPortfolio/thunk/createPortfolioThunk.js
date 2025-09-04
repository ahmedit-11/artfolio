import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createPortfolioThunk = createAsyncThunk("createPortfolioThunk", async (formData) => {
    try {
        console.log("Sending portfolio FormData with files");
        
        // When sending FormData, axios automatically sets the correct Content-Type header
        const response = await axios.post("/projects", formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        
        return response.data;
    } catch (error) {
        console.error("Portfolio creation error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});