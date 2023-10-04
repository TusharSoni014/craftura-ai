import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settingsSlice",
  initialState: {
    negPrompt: "",
    seed: "",
    amount: 1,
    privateMode: false,
  },
  reducers: {
    updateNegPrompt: (state, action) => {
      state.negPrompt = action.payload;
    },
    updateSeed: (state, action) => {
      state.seed = action.payload;
    },
    updateAmount: (state, action) => {
      state.amount = action.payload;
    },
    togglePrivateMode: (state, action) => {
      state.privateMode = action.payload;
    },
  },
});

export const {
  updateNegPrompt,
  updateSeed,
  updateAmount,
  togglePrivateMode,
} = settingsSlice.actions;

export default settingsSlice.reducer;
