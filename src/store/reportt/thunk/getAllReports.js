import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies  from "js-cookie";
export const getAllReports = createAsyncThunk("getAllReports", async () => {
    const token =Cookies.get("token")
    console.log(token)
    try {
        const response = await axios.get("/admin/reports",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        });
        return response.data?.data;

    } catch (error) {
        console.log(error)
        return Promise.reject(error.response?.data || error.message);
    }
});
