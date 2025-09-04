import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'

export const loginThunk = createAsyncThunk("loginThunk", async (data) => {
    try {
        const response = await axios.post("/login",{
            email:data.email,
            password:data.password
        });
        Cookies.set('token',response.data.access_token)
        return response.data;   
    } catch (error) {
        console.error("Login error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});