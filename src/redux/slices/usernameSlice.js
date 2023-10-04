import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { errorMessageHandler } from "../../components/utils/utilFunctions";
import axiosClient from "../../components/utils/axiosClient";

export const fetchUsernameDetails = createAsyncThunk(
  "fetchUsernameDetails",
  async (body, thunkApi) => {
    const { username } = body;
    try {
      const response = await axiosClient.get(
        `/user/usernameDetails/${username}`
      );
      thunkApi.dispatch(updateUserFound(true));
      return response.data;
    } catch (error) {
      console.log(error.data.message);
      thunkApi.dispatch(updateUserFound(false));
    }
  }
);
export const fetchUsernamePosts = createAsyncThunk(
  "fetchUsernamePosts",
  async (body) => {
    const { username, page } = body;
    try {
      const response = await axiosClient.get(
        `/image/getUserImage/${username}/${page}`
      );
      return response.data.posts;
    } catch (error) {
      errorMessageHandler(error);
    }
  }
);

const usernameSlice = createSlice({
  name: "usernameSlice",
  initialState: {
    user: {
      username: "Username",
      picture: null,
      postsLength: null,
      posts: [],
    },
    pageLoading: false,
    postsLoading: true,
    userFound: false,
    isLoadMoreBtn: true,
  },
  reducers: {
    updateUserFound: (state, action) => {
      state.userFound = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsernameDetails.fulfilled, (state, action) => {
        state.pageLoading = false;
        if (action.payload !== undefined) {
          const { username, picture, postsLength } = action.payload;
          state.user.username = username;
          state.user.picture = picture;
          state.user.postsLength = postsLength;
          state.userFound = true;
        } else {
          state.user.username = "Username";
          state.user.picture = null;
          state.user.postsLength = null;
          state.user.posts = [];
          state.userFound = false;
        }
      })
      .addCase(fetchUsernameDetails.rejected, (state) => {
        state.pageLoading = false;
      })
      .addCase(fetchUsernameDetails.pending, (state) => {
        state.pageLoading = true;
      })
      .addCase(fetchUsernamePosts.pending, (state) => {
        state.postsLoading = true;
      })
      .addCase(fetchUsernamePosts.rejected, (state) => {
        state.postsLoading = false;
      })
      .addCase(fetchUsernamePosts.fulfilled, (state, action) => {
        if (action.meta.arg.page === 1) {
          state.user.posts = action.payload;
        } else {
          if (action.payload === undefined) {
            toast.error("Error try again!");
          }
          state.user.posts = [...state.user.posts, ...action.payload];
          if (action.payload.length == 0) {
            state.isLoadMoreBtn = false;
          }
        }
        state.postsLoading = false;
      });
  },
});

export const { updateUserFound } = usernameSlice.actions;
export default usernameSlice.reducer;
