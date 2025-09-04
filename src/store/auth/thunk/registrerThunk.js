import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerThunk = createAsyncThunk("registerThunk", async (data) => {
    try {
        const response = await axios.post("/register",data);
        return response.data;
    } catch (error) {
        console.error("Register error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});