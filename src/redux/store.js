import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import appSlice from "./slices/appSlice";
import imageGenerateSlice from "./slices/imageGenerateSlice";
import utilSlice from "./slices/utilSlice";
import settingsSlice from "./slices/settingsSlice";
import thunk from "redux-thunk";
import homeSlice from "./slices/homeSlice";
import currentUserSlice from "./slices/currentUserSlice";
import usernameSlice from "./slices/usernameSlice";
import postDetailsSlice from "./slices/postDetailsSlice";
import multiPostCreateSlice from "./slices/multiPostCreateSlice";

const persistConfig = {
  key: "root",
  storage,
};

const persistedAppSliceReducer = persistReducer(persistConfig, appSlice);

const store = configureStore({
  reducer: {
    appSlice: persistedAppSliceReducer,
    imageGenerateSlice: imageGenerateSlice,
    utilSlice: utilSlice,
    settingsSlice: settingsSlice,
    homeSlice: homeSlice,
    currentUserSlice: currentUserSlice,
    usernameSlice: usernameSlice,
    postDetailsSlice: postDetailsSlice,
    multiPostCreateSlice: multiPostCreateSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk],
});

const persistor = persistStore(store);
export default store;
export { persistor };
