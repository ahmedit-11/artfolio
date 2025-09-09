import { createSlice } from "@reduxjs/toolkit";
import { getTrendingProjectsThunk } from "./thunk/getTrendingProjectsThunk";

const initialState = {
    loading: false,
    projects: [],
    error: null
};

const trendingSlice = createSlice({
    name: "trending",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Get trending projects
        builder.addCase(getTrendingProjectsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(getTrendingProjectsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.projects = action.payload;
            state.error = null;
        });
        builder.addCase(getTrendingProjectsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    }
});

export default trendingSlice.reducer;
