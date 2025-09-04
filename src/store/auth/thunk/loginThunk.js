import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { email } from "zod";
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
        console.log(error)
        return error.response.data;
    }
});