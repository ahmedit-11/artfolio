import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie"
export const getAllUsers = createAsyncThunk("getAllUsers", async () => {
    try {
        const token=Cookies.get("token")
        const response = await axios.get("/admin/users",{
            headers:{
                Authorization :`Bearer ${token}`
            }
        }

        );
        return response.data?.data;
    } catch (error) {  
        console.log(error) 
        return error.response.data;
    }
});