import { createSlice } from "@reduxjs/toolkit";
import { getAllCatThunk } from "./thunk/getAllCatThunk";

const initialState={
    loading:false,
    error:null,
    categories:[],
}

const getAllCategories = createSlice({
    name: "getAllCategories",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllCatThunk.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(getAllCatThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.categories=action.payload
        })
        builder.addCase(getAllCatThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default getAllCategories.reducer;
