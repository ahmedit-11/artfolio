import { createSlice } from "@reduxjs/toolkit";
import { getCategoryPortfoliosThunk } from "./thunk/getCategoryPortfoliosThunk";

const initialState = {
    loading: false,
    error: null,
    portfolios: [],
    category: null
};

const categoryPortfoliosSlice = createSlice({
    name: "categoryPortfolios",
    initialState,
    reducers: {
        clearCategoryPortfolios: (state) => {
            state.portfolios = [];
            state.category = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCategoryPortfoliosThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCategoryPortfoliosThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolios = action.payload.projects || action.payload;
                state.category = action.payload.category || null;
                state.error = null;
            })
            .addCase(getCategoryPortfoliosThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearCategoryPortfolios } = categoryPortfoliosSlice.actions;
export default categoryPortfoliosSlice.reducer;
