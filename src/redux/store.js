import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice";
import splitReducer from "./reducers/splitReducer";

const store = configureStore({
  reducer: {
    api: apiReducer,
    split: splitReducer,
  },
});

export default store;
