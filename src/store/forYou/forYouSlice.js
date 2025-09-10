import { createSlice } from "@reduxjs/toolkit";
import { getForYouPortfoliosThunk } from "./thunk/getForYouPortfoliosThunk";

const initialState = {
  loading: false,
  error: null,
  portfolios: [],
};

const forYouSlice = createSlice({
  name: "forYou",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getForYouPortfoliosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getForYouPortfoliosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.portfolios = action.payload;
        state.error = null;
      })
      .addCase(getForYouPortfoliosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default forYouSlice.reducer;
