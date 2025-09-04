import { createSlice } from "@reduxjs/toolkit";
import { getAllPortfolioThunk } from "./thunk/getAllPortfolioThunk";
import { getPortfolioByIdThunk } from "./thunk/getPortfolioByIdThunk";

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
        builder.addCase(getAllPortfolioThunk.pending, (state) => {
            state.loadingAllPortfolio = true;
        })  
        builder.addCase(getAllPortfolioThunk.fulfilled, (state, action) => {
            state.loadingAllPortfolio = false;
            state.portfolio=action.payload
        })
        builder.addCase(getAllPortfolioThunk.rejected, (state, action) => {
            state.loadingAllPortfolio = false;
            state.error = action.payload;
        })
        builder.addCase(getPortfolioByIdThunk.pending, (state) => {
            state.loadingOnePortfolio = true;
        })  
        builder.addCase(getPortfolioByIdThunk.fulfilled, (state, action) => {
            state.loadingOnePortfolio = false;
            state.portfolioById =action.payload
        })
        builder.addCase(getPortfolioByIdThunk.rejected, (state, action) => {
            state.loadingOnePortfolio = false;
            state.error = action.payload;
        })
    }
})
export default getAllPortfolio.reducer