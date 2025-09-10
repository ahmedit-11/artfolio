import { createSlice } from "@reduxjs/toolkit";
import { createReportThunk } from "./thunk/createReport";
import { getAllReports } from "./thunk/getAllReports";

const initialState = {
    loading: false,
    error: null,
    reports: []
};

const reportSlice = createSlice({
    name: "reportSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReportThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(createReportThunk.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(createReportThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            }).addCase(getAllReports.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllReports.fulfilled, (state, action) => {
                state.loading = false;
                state.reports = action.payload;
            })
            .addCase(getAllReports.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});

export default reportSlice.reducer;
