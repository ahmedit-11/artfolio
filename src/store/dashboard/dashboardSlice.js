import { createSlice } from "@reduxjs/toolkit";
import { getDashboardStatsThunk } from "./thunk/getDashboardStatsThunk";

const initialState = {
    loading: false,
    error: null,
    stats: {
        totalProjects: 0,
        totalUsers: 0,
        totalCategories: 0,
        totalReports: 0
    }
};

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDashboardStatsThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(getDashboardStatsThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.stats = action.payload;
            state.error = null;
        })
        builder.addCase(getDashboardStatsThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
});

export default dashboardSlice.reducer;
