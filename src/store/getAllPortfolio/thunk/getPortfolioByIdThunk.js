import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getPortfolioByIdThunk = createAsyncThunk("getPortfolioByIdThunk", async (id) => {
    try {
        const response = await axios.get(`/projects/${id}`);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
});