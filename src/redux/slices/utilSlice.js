import { createSlice } from "@reduxjs/toolkit";

const utilSlice = createSlice({
  name: "utilSlice",
  initialState: {
    siteLoading: false,
    isSignonModalOpen: false,
    siteName:"Craftura AI",
  },
  reducers: {
    updateSiteLoading: (state, action) => {
      state.siteLoading = action.payload;
    },
    toggleSignonModalOpen: (state) => {
      state.isSignonModalOpen = !state.isSignonModalOpen;
    },
    closeSignonModal: (state) => {
      state.isSignonModalOpen = false;
    },
  },
});

export const { updateSiteLoading, toggleSignonModalOpen, closeSignonModal } =
  utilSlice.actions;
export default utilSlice.reducer;
