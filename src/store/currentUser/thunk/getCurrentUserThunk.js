import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getCurrentUserThunk = createAsyncThunk(
  "currentUser/getCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
   
      const response = await axios.get("/user/profile");
      
     
      
      // If response has success/message structure, extract the user data
      if (response.data && typeof response.data === 'object') {
        // If it's a success response with user data
        if (response.data.user) {
          return response.data.user;
        }
        // If it's direct user data (no wrapper)
        if (response.data.id && response.data.name) {
          return response.data;
        }
      }
      
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message || "Failed to fetch user data";
      return rejectWithValue(errorMessage);
    }
  }
);
