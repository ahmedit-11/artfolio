import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllPortfolioThunk = createAsyncThunk("getAllPortfolioThunk", async () => {
    try {
        const response = await axios.get("/projects");
        return response.data;
    } catch (error) {
        return Promise.reject(error.response?.data || error.message);
    }
});