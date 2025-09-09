import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from 'js-cookie'
import { getCurrentUserThunk } from "../../currentUser/thunk/getCurrentUserThunk";

export const loginThunk = createAsyncThunk("loginThunk", async (data, { dispatch }) => {
    try {
        const response = await axios.post("/login",{
            email:data.email,
            password:data.password
        });
        Cookies.set('token',response.data.access_token)
        
        // Dispatch getCurrentUserThunk to populate Redux currentUser state
        await dispatch(getCurrentUserThunk());
        
        return response.data;   
    } catch (error) {
        console.error("Login error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data || error.message);
    }
});