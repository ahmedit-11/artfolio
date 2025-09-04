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
        builder.addCase(updatePortfolioThunk.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(updatePortfolioThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.portfolio=action.payload
        })
        builder.addCase(updatePortfolioThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default updatePortfolio.reducer;
