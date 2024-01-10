import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "userSlice",
  initialState: {
    currentUser: null,
    error: null,
  },
  reducers: {
    successData: (state, action) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    failureData: (state, action) => {
      state.error = action.payload;
      state.currentUser = null;
    },
    deleteData: (state, action) => {
      state.currentUser = null;
      state.error = null;
    },
    errorData: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { successData, failureData, deleteData, errorData } = userSlice.actions;

export default userSlice.reducer;
