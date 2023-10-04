import { createSlice } from "@reduxjs/toolkit";

const multiPostCreateSlice = createSlice({
  name: "multiPostCreateSlice",
  initialState: {
    posts: [],
  },
  reducers: {
    updatePosts: (state, action) => {
      state.posts.push(action.payload);
    },
    clearPosts: (state, action) => {
      state.posts = [];
    },
  },
});

export const { updatePosts, clearPosts } = multiPostCreateSlice.actions;
export default multiPostCreateSlice.reducer;
