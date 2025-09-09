import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "./thunk/getAllUsers";
import { getChatUsersThunk } from "./thunk/getChatUsersThunk";
import { getUserByIdThunk } from "./thunk/getUserByIdThunk";

const initialState={
    loading:false,
    error:null,
    users:[],
    chatUsers: [],
    chatUsersLoading: false,
    chatUsersError: null,
    pagination: null,
    userById: {},
    userByIdLoading: {},
    userByIdError: {},
}
const users = createSlice({
    name: "users",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        // Admin users (existing)
        builder.addCase(getAllUsers.pending, (state) => {
            state.loading = true;
            state.error = null;
        })  
        builder.addCase(getAllUsers.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        })
        builder.addCase(getAllUsers.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        
        // Chat users (new)
        builder.addCase(getChatUsersThunk.pending, (state) => {
            state.chatUsersLoading = true;
            state.chatUsersError = null;
        })
        builder.addCase(getChatUsersThunk.fulfilled, (state, action) => {
            state.chatUsersLoading = false;
            state.chatUsers = action.payload.users;
            state.pagination = action.payload.pagination;
            state.chatUsersError = null;
        })
        builder.addCase(getChatUsersThunk.rejected, (state, action) => {
            state.chatUsersLoading = false;
            state.chatUsersError = typeof action.payload === 'string' ? action.payload : JSON.stringify(action.payload);
        })
        
        // Get user by ID (new)
        builder.addCase(getUserByIdThunk.pending, (state, action) => {
            const userId = action.meta.arg;
            state.userByIdLoading[userId] = true;
            state.userByIdError[userId] = null;
        })
        builder.addCase(getUserByIdThunk.fulfilled, (state, action) => {
            const userId = action.meta.arg;
            state.userByIdLoading[userId] = false;
            state.userById[userId] = action.payload.user;
            state.userByIdError[userId] = null;
        })
        builder.addCase(getUserByIdThunk.rejected, (state, action) => {
            const userId = action.meta.arg;
            state.userByIdLoading[userId] = false;
            state.userByIdError[userId] = typeof action.payload === 'string' ? action.payload : JSON.stringify(action.payload);
        })
    }
})

export const {} = users.actions;
export default users.reducer