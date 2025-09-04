import { createSlice } from "@reduxjs/toolkit";
import { getCurrentUserThunk } from "./thunk/getCurrentUserThunk";

const initialState = {
    loading: false,
    error: null,
    currentUser: null,
}

const currentUser = createSlice({
    name: "currentUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCurrentUserThunk.pending, (state) => {
            state.loading = true;
        })
        builder.addCase(getCurrentUserThunk.rejected, (state, action) => {
            state.loading = false;
            // Ensure error is a string, not an object
            state.error = typeof action.payload === 'string' ? action.payload : JSON.stringify(action.payload);
        })
        builder.addCase(getCurrentUserThunk.fulfilled, (state, action) => {
            state.loading = false;
            // Handle backend response structure - extract user data from response
            state.currentUser = action.payload.user || action.payload;
            state.error = null;
        });
    }
});

export default currentUser.reducer;
