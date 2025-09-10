import { createSlice } from '@reduxjs/toolkit';
import { changePasswordThunk } from './thunk/changePasswordThunk';

const initialState = {
  loading: false,
  success: false,
  error: null,
  message: null,
};

const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    resetChangePasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePasswordThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
        state.message = null;
      })
      .addCase(changePasswordThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.message = action.payload.message || 'Password changed successfully';
      })
      .addCase(changePasswordThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to change password';
        state.message = null;
      });
  },
});

export const { resetChangePasswordState, clearError, clearSuccess } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
