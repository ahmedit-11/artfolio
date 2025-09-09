import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserByIdThunk = createAsyncThunk("users/getUserById", async (userId) => {
    try {
        // Try to search for the specific user by ID using search endpoint
        // This is a workaround since there's no dedicated /users/{id} endpoint
        const response = await axios.get("/search/users", { 
            params: { 
                per_page: 100,
                // We'll search through all users to find the one with matching ID
            } 
        });
        
        if (response.data && response.data.data) {
            const user = response.data.data.find(u => u.id == userId);
            if (user) {
                return { user };
            }
        }
        
        // If not found in first page, try without pagination to get all users
        const allUsersResponse = await axios.get("/users", { 
            params: { per_page: 1000 } 
        });
        
        if (allUsersResponse.data && allUsersResponse.data.data) {
            const user = allUsersResponse.data.data.find(u => u.id == userId);
            if (user) {
                return { user };
            }
        }
        
        // If user still not found, throw error
        throw new Error(`User with ID ${userId} not found`);
        
    } catch (error) {
        console.error("Get user by ID error:", error);
        console.error("Error response:", error.response?.data);
        console.error("Error status:", error.response?.status);
        return Promise.reject(error.response?.data?.message || error.message || "Failed to fetch user");
    }
});
