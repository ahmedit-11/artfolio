import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const createReportThunk = createAsyncThunk("createReportThunk", async (data) => {
    const token=Cookies.get("token")
    console.log("Sending data:", data); 
    console.log("Token:", token);
    try {
        const response = await axios.post(`/reports`,{
            reason:data.reason,reportable_type:data.reportable_type,reportable_id:data.reportable_id
        },{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log(error)
        return Promise.reject(error.response?.data || error.message);
    }
});
