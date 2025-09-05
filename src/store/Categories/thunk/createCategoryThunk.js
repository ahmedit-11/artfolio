import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createCategoryThunk = createAsyncThunk("createCategoryThunk", async (categoryData) => {
    try {
        const response = await axios.post("/admin/categories", categoryData);
        return response.data.data || response.data;
    } catch (error) {
        console.error("Create category error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
