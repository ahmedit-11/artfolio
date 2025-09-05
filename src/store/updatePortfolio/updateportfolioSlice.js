import { createSlice } from "@reduxjs/toolkit";
import { updatePortfolioThunk } from "./thunk/updatePortfolioThunk";

const initialState={
    loading:false,
    error:null,
    portfolio:[],
}

const updatePortfolio = createSlice({
    name: "updatePortfolio",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(updatePortfolioThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePortfolioThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.portfolio = action.payload;
                state.error = null;
            })
            .addCase(updatePortfolioThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
})
export default updatePortfolio.reducer;
