import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../../../lib/api';

export const changePasswordThunk = createAsyncThunk(
  'changePassword/changePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await authAPI.changePassword(passwordData);
      return response;
    } catch (error) {
      const message = error.response?.data?.message || error.message || 'Failed to change password';
      return rejectWithValue(message);
    }
  }
);
