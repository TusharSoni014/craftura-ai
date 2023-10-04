import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../components/utils/axiosClient";

export const fetchUserDetails = createAsyncThunk(
  "fetchUserDetails",
  async () => {
    const response = await axiosClient.get("/user/userDetails");
    return response.data;
  }
);

const appSlice = createSlice({
  name: "appSlice",
  initialState: {
    isLoggedIn: false,
    currentUser: {},
    buttonTimerExpiration: null,
    helperTourActive: true,
  },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUsername: (state, action) => {
      state.currentUser.username = action.payload;
    },
    setButtonTimerExpiration: (state, action) => {
      state.buttonTimerExpiration = action.payload;
    },
    updateHelperTourState: (state, action) => {
      state.helperTourActive = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserDetails.fulfilled, (state, action) => {
      const { picture } = action.payload;
      state.currentUser.picture = picture;
    });
  },
});

export const {
  setIsLoggedIn,
  updateCurrentUser,
  updateUsername,
  setButtonTimerExpiration,
  updateHelperTourState,
} = appSlice.actions;
export default appSlice.reducer;
