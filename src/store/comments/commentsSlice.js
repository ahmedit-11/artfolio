import { createSlice } from "@reduxjs/toolkit";
import { addCommentThunk } from "./thunk/addCommentThunk";
import { deleteCommentThunk } from "./thunk/deleteCommentThunk";
import { getCommentsThunk } from "./thunk/getCommentsThunk";

const initialState = {
  data: null,
  comments: [],
  currentProjectId: null,
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
      state.comments = [];
      state.currentProjectId = null;
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
        // Add new comment to the comments array
        if (action.payload.comment) {
          state.comments.unshift(action.payload.comment);
        }
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
        // Remove deleted comment from the comments array
        if (action.payload.commentId) {
          state.comments = state.comments.filter(comment => comment.id !== action.payload.commentId);
        }
      })
      .addCase(deleteCommentThunk.rejected, (state, action) => {
        state.deleteLoading = false;
        state.deleteError = action.payload || "Failed to delete comment";
      })
      // Get Comments
      .addCase(getCommentsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload.comments || [];
        state.currentProjectId = action.payload.projectId;
        state.error = null;
      })
      .addCase(getCommentsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch comments";
      });
  },
});

export const { clearCommentsError, resetCommentsState } = commentsSlice.actions;
export default commentsSlice.reducer;
