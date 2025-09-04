import { createSlice } from "@reduxjs/toolkit";
import { getAllTagsThunk } from "./thunk/getAllTagsThunk";
import { createTagThunk } from "./thunk/createTagThunk";

const initialState = {
  tags: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
};

const tagsSlice = createSlice({
  name: "tags",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Get All Tags
    builder
      .addCase(getAllTagsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTagsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(getAllTagsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
    // Create Tag
    builder
      .addCase(createTagThunk.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createTagThunk.fulfilled, (state, action) => {
        state.createLoading = false;
        // Add the new tag to the existing tags array
        if (action.payload && action.payload.tag) {
          state.tags.push(action.payload.tag);
        }
      })
      .addCase(createTagThunk.rejected, (state, action) => {
        state.createLoading = false;
        state.createError = action.payload;
      });
  },
});

export default tagsSlice.reducer;
