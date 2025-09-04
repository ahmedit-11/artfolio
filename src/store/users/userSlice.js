import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./thunk/getAllUsers";

const initialState={
    loading:false,
    error:null,
    users:[],
}
const users = createSlice({
    name: "users",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
        })  
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users=action.payload
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
    }
})
export default users.reducer