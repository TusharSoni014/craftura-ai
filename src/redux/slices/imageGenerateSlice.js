import { createSlice } from "@reduxjs/toolkit";

const imageGenerateSlice = createSlice({
  name: "imageGenerateSlice",
  initialState: {
    isLoading: false,
    isGenerated: false,
    prompt: "",
    imageURL: null,
    previousGenerations: [],
    enablePrevGen: true,
    prevGenPreviewCount: 6,
  },
  reducers: {
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsGenerated: (state, action) => {
      state.isGenerated = action.payload;
    },
    updatePrompt: (state, action) => {
      state.prompt = action.payload;
    },
    updateImageURL: (state, action) => {
      state.imageURL = action.payload;
    },
    updatePrevGenPreviewCount: (state, action) => {
      state.prevGenPreviewCount = action.payload;
    },
    updatePreviousGenerations: (state, action) => {
      if (state.enablePrevGen) {
        const itemsToAdd = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.previousGenerations.unshift(...itemsToAdd);
        if (state.previousGenerations.length > state.prevGenPreviewCount) {
          state.previousGenerations.splice(state.prevGenPreviewCount);
        }
      }
    },
    updatePrevGenSettings: (state, action) => {
      state.enablePrevGen = action.payload;
    },
    clearPrevGenImages: (state, action) => {
      state.previousGenerations = [];
    },
    resetSlice: (state) => {
      state.isLoading = false;
      state.isGenerated = false;
      state.prompt = "";
      state.imageURL = null;
      state.previousGenerations = [];
    },
  },
});

export const {
  setIsLoading,
  setIsGenerated,
  updatePrompt,
  updateImageURL,
  updatePreviousGenerations,
  resetSlice,
  updatePrevGenSettings,
  clearPrevGenImages,
  updatePrevGenPreviewCount,
} = imageGenerateSlice.actions;
export default imageGenerateSlice.reducer;
