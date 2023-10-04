import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { errorMessageHandler } from "../../components/utils/utilFunctions";
import axiosClient from "../../components/utils/axiosClient";

export const fetchHomeImages = createAsyncThunk(
  "fetchHomeImages",
  async (body, thunkApi) => {
    const { page } = body;
    try {
      const response = await axiosClient.get(`/image/getAllImages/${page}`);
      if (response.data.posts.length === 0) {
        thunkApi.dispatch(updatePostFlag(false));
      }
      return response.data.posts;
    } catch (error) {
      errorMessageHandler(error);
    } finally {
      thunkApi.dispatch(updateLoading(false));
    }
  }
);

const homeSlice = createSlice({
  name: "homeSlice",
  initialState: {
    posts: [],
    postsLoading: false,
    isMorePosts: true,
    error: null,
  },
  reducers: {
    updatePostFlag: (state, action) => {
      state.isMorePosts = action.payload;
    },
    updateLoading: (state, action) => {
      state.postsLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeImages.fulfilled, (state, action) => {
        try {
          if (action.meta.arg.page === 1) {
            state.posts = action.payload;
          } else {
            if (action.payload === undefined) {
              toast.error("Error try again!");
            }
            state.posts = [...state.posts, ...action.payload];
          }
          state.postsLoading = false;
          state.btnVisible = true;
          state.error = null;
        } catch (error) {
          toast.error("Error trying to load posts!");
          state.postsLoading = false;
        }
      })
      .addCase(fetchHomeImages.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(fetchHomeImages.rejected, (state) => {
        state.postsLoading = false;
      });
  },
});

export default homeSlice.reducer;
export const { updatePostFlag, updateLoading } = homeSlice.actions;
