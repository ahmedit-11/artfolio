import { createSlice } from "@reduxjs/toolkit";
import { getPortfolioDetailsThunk } from "./thunk/getPortfolioDetailsThunk";

const initialState = {
    loading: false,
    error: null,
    data: null
};

const portfolioDetailsSlice = createSlice({
    name: "portfolioDetails",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getPortfolioDetailsThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPortfolioDetailsThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload.project;
                state.error = null;
            })
            .addCase(getPortfolioDetailsThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.data = null;
            });
    }
});

export default portfolioDetailsSlice.reducer;
