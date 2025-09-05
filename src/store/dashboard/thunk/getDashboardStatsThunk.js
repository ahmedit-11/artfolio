import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getDashboardStatsThunk = createAsyncThunk("getDashboardStatsThunk", async () => {
    try {
        const response = await axios.get("/admin/dashboard");
        return response.data.data || response.data;
    } catch (error) {
        console.error("Get dashboard stats error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});
