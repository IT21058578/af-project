import { createSlice } from '@reduxjs/toolkit';

const packageSlice = createSlice({
  name: 'package',
  initialState: {
    package: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchpackageStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchpackageSuccess(state, action) {
      state.package = action.payload;
      state.loading = false;
    },
    fetchpackageFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchpackageStart,
  fetchpackageSuccess,
  fetchpackageFailure,
} = packageSlice.actions;

export const packageReducer = packageSlice.reducer;