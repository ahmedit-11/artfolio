import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getForYouPortfoliosThunk = createAsyncThunk(
  "forYou/getForYouPortfolios",
  async (params = {}) => {
    try {
     
      
      const response = await axios.get("/discovery/for-you", {
        params
      });
      
      
      return response.data;
    } catch (error) {
      console.error("Error fetching For You portfolios:", error);
      return Promise.reject(error.response?.data || error.message);
    }
  }
);
