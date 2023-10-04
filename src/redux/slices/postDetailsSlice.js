import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { errorMessageHandler } from "../../components/utils/utilFunctions";
import axiosClient from "../../components/utils/axiosClient";

export const fetchPostDetailsDrawer = createAsyncThunk(
  "fetchPostDetailsDrawer",
  async (body, thunkApi) => {
    const { postId, base64 } = body;
    thunkApi.dispatch(updatePostDetailOpenState(true));
    try {
      const response = await axiosClient.post("/image/postDetails", {
        postId: postId,
      });
      const { owner, prompt, negPrompt, seed, createdAt } = response.data;
      return { owner, prompt, negPrompt, seed, img: base64, createdAt };
    } catch (error) {
      errorMessageHandler(error);
    }
  }
);

const postDetailsSlice = createSlice({
  name: "postDetailsSlice",
  initialState: {
    post: {},
    postDetailsLoading: true,
    postDetailOpenState: false,
  },
  reducers: {
    clearPostDetails: (state) => {
      state.post = {};
      state.postDetailsLoading = false;
    },
    updatePostDetailOpenState: (state, action) => {
      state.postDetailOpenState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostDetailsDrawer.pending, (state) => {
        state.postDetailsLoading = true;
        state.post = {};
      })
      .addCase(fetchPostDetailsDrawer.rejected, (state) => {
        state.postDetailsLoading = false;
      })
      .addCase(fetchPostDetailsDrawer.fulfilled, (state, action) => {
        if (action.payload) {
          const { owner, prompt, negPrompt, seed, img, createdAt } =
            action.payload;
          state.post.owner = owner;
          state.post.prompt = prompt;
          state.post.negPrompt = negPrompt;
          state.post.seed = seed;
          state.post.img = img;
          state.post.createdAt = createdAt;
          state.postDetailsLoading = false;
        } else {
          state.postDetailsLoading = false;
        }
      });
  },
});

export const { clearPostDetails, updatePostDetailOpenState } =
  postDetailsSlice.actions;
export default postDetailsSlice.reducer;
