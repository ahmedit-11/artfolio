import { createSlice } from "@reduxjs/toolkit";
import { createPortfolioThunk } from "./thunk/createPortfolioThunk";

const initialState={
    loading:false,
    error:null,
    portfolio:[],
}

const createPortfolio = createSlice({
    name: "createPortfolio",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(createPortfolioThunk.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(createPortfolioThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.portfolio=action.payload
        })
        builder.addCase(createPortfolioThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default createPortfolio.reducer;
