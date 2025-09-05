import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const deleteCategoryThunk = createAsyncThunk("deleteCategoryThunk", async (categoryId) => {
    try {
        const response = await axios.delete(`/admin/categories/${categoryId}`);
        return { categoryId, ...response.data };
    } catch (error) {
        console.error("Delete category error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
