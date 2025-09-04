import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const registerThunk = createAsyncThunk("registerThunk", async (data) => {
    try {
        const response = await axios.post("/register",data);
        console.log("res",response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        return error.response.data;
    }
});