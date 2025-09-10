import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createTagThunk = createAsyncThunk("createTagThunk", async (tagData) => {
    try {
        const response = await axios.post("/tags", { name: tagData.name });
        return response.data;
    } catch (error) {
        console.error("Create tag error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
