import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateCategoryThunk = createAsyncThunk("updateCategoryThunk", async ({ id, categoryData }) => {
    try {
        const response = await axios.post(`/admin/categories/${id}/update`, categoryData);
        return response.data.data || response.data;
    } catch (error) {
        console.error("Update category error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
