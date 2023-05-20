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
    addTripPackage: (state, action) => {
      state.push(action.payload);
    },
    updateTripPackage: (state, action) => {
      const { tripPackageId, updatedData } = action.payload;
      const tripPackageIndex = state.findIndex(
        (tripPackage) => tripPackage._id === tripPackageId
      );
      if (tripPackageIndex !== -1) {
        state[tripPackageIndex] = {
          ...state[tripPackageIndex],
          ...updatedData,
        };
      }
    },
    deleteTripPackage: (state, action) => {
      const tripPackageId = action.payload;
      const tripPackageIndex = state.findIndex(
        (tripPackage) => tripPackage._id === tripPackageId
      );
      if (tripPackageIndex !== -1) {
        state.splice(tripPackageIndex, 1);
      }
    },
  },
});

export const {
  fetchpackageStart,
  fetchpackageSuccess,
  fetchpackageFailure,
  addTripPackage, 
  updateTripPackage, 
  deleteTripPackage
} = packageSlice.actions;

export const packageReducer = packageSlice.reducer;