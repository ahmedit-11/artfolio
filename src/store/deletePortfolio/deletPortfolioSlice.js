import { createSlice } from "@reduxjs/toolkit";
import { deletePortfolioThunk } from "./thunk/deletePortfolioThunk";

const initialState = {
    loading: false,
    error: null,
    data: null
};

const deletePortfolio = createSlice({
    name: "deletePortfolio",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(deletePortfolioThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(deletePortfolioThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(deletePortfolioThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default deletePortfolio.reducer;
