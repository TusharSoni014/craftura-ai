import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { errorMessageHandler } from "../../components/utils/utilFunctions";
import axiosClient from "../../components/utils/axiosClient";

export const fetchMyPosts = createAsyncThunk(
  "fetchMyPosts",
  async (body, thunkApi) => {
    const { page } = body;
    try {
      const response = await axiosClient.get(`/user/get-my-posts/${page}`);
      return response.data.posts;
    } catch (error) {
      thunkApi.dispatch(fetchMyPosts.rejected(error.data.message));
      toast.error(error.response.data.message);
    }
  }
);
export const fetchMyPostsCount = createAsyncThunk(
  "fetchMyPostsCount",
  async (_, thunkApi) => {
    try {
      const response = await axiosClient.get(`/user/get-post-count`);
      return response.data.postsCount;
    } catch (error) {
      errorMessageHandler(error);
      thunkApi.dispatch(fetchMyPosts.rejected(error.data.message));
    }
  }
);

const currentUserSlice = createSlice({
  name: "currentUserSlice",
  initialState: {
    posts: [],
    myPostsLoading: false,
    myPostscount: null,
    editMode: false,
    postError: null,
    isLoadMoreBtn: true,
  },
  reducers: {
    emptyCurrentPosts: (state, action) => {
      state.posts = [];
    },
    updateEditMode: (state, action) => {
      state.editMode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyPosts.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.posts = action.payload;
        } else {
          if (action.payload === undefined) {
            toast.error("Error try again!");
          }
          state.posts = [...state.posts, ...action.payload];
          if (action.payload.length == 0) {
            state.isLoadMoreBtn = false;
          }
        }
        state.myPostsLoading = false;
        state.postError = null;
      })
      .addCase(fetchMyPosts.pending, (state, action) => {
        state.myPostsLoading = true;
        state.postError = null;
      })
      .addCase(fetchMyPosts.rejected, (state, action) => {
        state.myPostsLoading = false;
        state.postError = action.error.message;
      })
      .addCase(fetchMyPostsCount.fulfilled, (state, action) => {
        state.myPostscount = action.payload;
      })
      .addCase(fetchMyPostsCount.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { emptyCurrentPosts, updateEditMode } = currentUserSlice.actions;
export default currentUserSlice.reducer;
