import { createSlice } from "@reduxjs/toolkit";
import { updateProfileThunk } from "./thunk/updateProfilethunk";

const initialState={
    loading:false,
    error:null,
    profile:[],
}

const updateProfile = createSlice({
    name: "updateProfile",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(updateProfileThunk.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(updateProfileThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.profile=action.payload
        })
        builder.addCase(updateProfileThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default updateProfile.reducer;
