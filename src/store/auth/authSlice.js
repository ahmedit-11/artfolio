import { createSlice } from "@reduxjs/toolkit";
import { loginThunk } from "./thunk/loginThunk";
import { registerThunk } from "./thunk/registrerThunk";

const initialState={
    loading:false,
    error:null,
    user:[]
}
const authSlice = createSlice({
    name: "login",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(loginThunk.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(loginThunk.fulfilled, (state, action) => {
            state.loading = false;
            state.user=action.payload
        })
        builder.addCase(loginThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        builder.addCase(registerThunk.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(registerThunk.fulfilled, (state, action) => {
            state.loading = false;
        })
        builder.addCase(registerThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default authSlice.reducer