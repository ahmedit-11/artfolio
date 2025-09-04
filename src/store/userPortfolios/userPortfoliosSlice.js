import { createSlice } from "@reduxjs/toolkit";
import { getUserPortfoliosThunk } from "./thunk/getUserPortfoliosThunk";

const initialState = {
  loading: false,
  error: null,
  data: []
};

const userPortfoliosSlice = createSlice({
  name: "userPortfolios",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPortfoliosThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserPortfoliosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(getUserPortfoliosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default userPortfoliosSlice.reducer;
