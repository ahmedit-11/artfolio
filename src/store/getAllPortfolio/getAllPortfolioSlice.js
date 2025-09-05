import { createSlice } from "@reduxjs/toolkit";
import { getAllPortfolioThunk } from "./thunk/getAllPortfolioThunk";
import { getPortfolioByIdThunk } from "./thunk/getPortfolioByIdThunk";
import { getPortfolioForEditThunk } from "./thunk/getPortfolioForEditThunk";

const initialState={
    loadingAllPortfolio:false,
    loadingOnePortfolio:false,
    error:null,
    portfolio:[],
    portfolioById:[],
    conter:0
}
const getAllPortfolio = createSlice({
    name: "getAllPortfolio",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(getAllPortfolioThunk.pending, (state) => {
                state.loadingAllPortfolio = true;
                state.error = null;
            })
            .addCase(getAllPortfolioThunk.fulfilled, (state, action) => {
                state.loadingAllPortfolio = false;
                state.portfolio = action.payload;
                state.error = null;
            })
            .addCase(getAllPortfolioThunk.rejected, (state, action) => {
                state.loadingAllPortfolio = false;
                state.error = action.payload;
            })
            .addCase(getPortfolioByIdThunk.pending, (state) => {
                state.loadingOnePortfolio = true;
                state.error = null;
            })
            .addCase(getPortfolioByIdThunk.fulfilled, (state, action) => {
                state.loadingOnePortfolio = false;
                state.portfolioById = action.payload;
                state.error = null;
            })
            .addCase(getPortfolioByIdThunk.rejected, (state, action) => {
                state.loadingOnePortfolio = false;
                state.error = action.payload;
            })
            .addCase(getPortfolioForEditThunk.pending, (state) => {
                state.loadingOnePortfolio = true;
                state.error = null;
            })
            .addCase(getPortfolioForEditThunk.fulfilled, (state, action) => {
                state.loadingOnePortfolio = false;
                state.portfolioById = action.payload;
                state.error = null;
            })
            .addCase(getPortfolioForEditThunk.rejected, (state, action) => {
                state.loadingOnePortfolio = false;
                state.error = action.payload;
            });
    }
})
export default getAllPortfolio.reducer;