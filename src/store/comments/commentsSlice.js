import { createSlice } from "@reduxjs/toolkit";
import { addCommentThunk } from "./thunk/addCommentThunk";
import { deleteCommentThunk } from "./thunk/deleteCommentThunk";

const initialState = {
  data: null,
  loading: false,
  error: null,
  deleteLoading: false,
  deleteError: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearCommentsError: (state) => {
      state.error = null;
      state.deleteError = null;
    },
    resetCommentsState: (state) => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.deleteLoading = false;
      state.deleteError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add Comment
      .addCase(addCommentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addCommentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(addCommentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to add comment";
      })
      // Delete Comment
      .addCase(deleteCommentThunk.pending, (state) => {
        state.deleteLoading = true;
        state.deleteError = null;
      })
      .addCase(deleteCommentThunk.fulfilled, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = null;
      })
      .addCase(deleteCommentThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || "Failed to delete comment";
      });
  },
});

export const { clearCommentsError, resetCommentsState } = commentsSlice.actions;
export default commentsSlice.reducer;
