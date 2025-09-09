import { createSlice } from "@reduxjs/toolkit";
import { getAllTagsThunk } from "./thunk/getAllTagsThunk";
import { createTagThunk } from "./thunk/createTagThunk";
import { addTagToProjectThunk } from "./thunk/addTagToProjectThunk";
import { updateProjectTagsThunk } from "./thunk/updateProjectTagsThunk";
import { removeTagFromProjectThunk } from "./thunk/removeTagFromProjectThunk";

const initialState = {
  tags: [],
  loading: false,
  error: null,
  createLoading: false,
  createError: null,
  projectTagLoading: false,
  projectTagError: null,
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
      })

    // Add Tag to Project
    builder
      .addCase(addTagToProjectThunk.pending, (state) => {
        state.projectTagLoading = true;
        state.projectTagError = null;
      })
      .addCase(addTagToProjectThunk.fulfilled, (state, action) => {
        state.projectTagLoading = false;
        // Add the new tag to tags array if it doesn't exist
        if (action.payload && action.payload.tag) {
          const existingTag = state.tags.find(tag => tag.id === action.payload.tag.id);
          if (!existingTag) {
            state.tags.push(action.payload.tag);
          }
        }
      })
      .addCase(addTagToProjectThunk.rejected, (state, action) => {
        state.projectTagLoading = false;
        state.projectTagError = action.payload;
      })

    // Update Project Tags
    builder
      .addCase(updateProjectTagsThunk.pending, (state) => {
        state.projectTagLoading = true;
        state.projectTagError = null;
      })
      .addCase(updateProjectTagsThunk.fulfilled, (state) => {
        state.projectTagLoading = false;
      })
      .addCase(updateProjectTagsThunk.rejected, (state, action) => {
        state.projectTagLoading = false;
        state.projectTagError = action.payload;
      })

    // Remove Tag from Project
    builder
      .addCase(removeTagFromProjectThunk.pending, (state) => {
        state.projectTagLoading = true;
        state.projectTagError = null;
      })
      .addCase(removeTagFromProjectThunk.fulfilled, (state) => {
        state.projectTagLoading = false;
      })
      .addCase(removeTagFromProjectThunk.rejected, (state, action) => {
        state.projectTagLoading = false;
        state.projectTagError = action.payload;
      });
  },
});

export default tagsSlice.reducer;
