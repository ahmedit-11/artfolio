import { createSlice } from "@reduxjs/toolkit";
import { getAllCatThunk } from "./thunk/getAllCatThunk";
import { createCategoryThunk } from "./thunk/createCategoryThunk";
import { updateCategoryThunk } from "./thunk/updateCategoryThunk";
import { deleteCategoryThunk } from "./thunk/deleteCategoryThunk";

const initialState={
    loading:false,
    error:null,
    categories:[],
    createLoading: false,
    updateLoading: false,
    deleteLoading: false,
}

const getAllCategories = createSlice({
    name: "getAllCategories",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        // Get All Categories
        builder
            .addCase(getAllCatThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllCatThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.categories = action.payload;
                state.error = null;
            })
            .addCase(getAllCatThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            
            // Create Category
            .addCase(createCategoryThunk.pending, (state) => {
                state.createLoading = true;
                state.error = null;
            })
            .addCase(createCategoryThunk.fulfilled, (state, action) => {
                state.createLoading = false;
                state.categories.push(action.payload);
                state.error = null;
            })
            .addCase(createCategoryThunk.rejected, (state, action) => {
                state.createLoading = false;
                state.error = action.payload;
            })
            
            // Update Category
            .addCase(updateCategoryThunk.pending, (state) => {
                state.updateLoading = true;
                state.error = null;
            })
            .addCase(updateCategoryThunk.fulfilled, (state, action) => {
                state.updateLoading = false;
                const index = state.categories.findIndex(cat => cat.id === action.payload.id);
                if (index !== -1) {
                    state.categories[index] = action.payload;
                }
                state.error = null;
            })
            .addCase(updateCategoryThunk.rejected, (state, action) => {
                state.updateLoading = false;
                state.error = action.payload;
            })
            
            // Delete Category
            .addCase(deleteCategoryThunk.pending, (state) => {
                state.deleteLoading = true;
                state.error = null;
            })
            .addCase(deleteCategoryThunk.fulfilled, (state, action) => {
                state.deleteLoading = false;
                state.categories = state.categories.filter(cat => cat.id !== action.payload.categoryId);
                state.error = null;
            })
            .addCase(deleteCategoryThunk.rejected, (state, action) => {
                state.deleteLoading = false;
                state.error = action.payload;
            });
    }
})
export default getAllCategories.reducer;
