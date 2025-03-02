import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCall } from "../services/apiService";
import Constants from "../Constants/constants";

export const loginUser = createAsyncThunk("api/login", async (credentials) => {
  return await apiCall(Constants.LOGIN_API_URL, "POST", credentials);
});

export const registerUser = createAsyncThunk(
  "api/register",
  async (userData) => {
    return await apiCall(Constants.REGISTER_USER_API_URL, "POST", userData);
  }
);

export const getExpenses = createAsyncThunk(
  "api/getExpenses",
  async (userId) => {
    return await apiCall(
      `${Constants.GET_ALL_EXPENSES_BY_USER}${userId}`,
      "GET"
    );
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState: {
    showLoader: false,
    data: null,
    error: null,
    headerTitle: "Expense Splitter",
  },
  reducers: {
    setHeaderTitle: (state, action) => {
      state.headerTitle = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.showLoader = false;
        state.user = action.payload.data;
        state.error = action.payload.error;
      })
      .addCase(registerUser.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.showLoader = false;
        state.user = action.payload.data;
        state.error = action.payload.error;
      })
      .addCase(getExpenses.pending, (state) => {
        state.showLoader = true;
      })
      .addCase(getExpenses.fulfilled, (state, action) => {
        state.showLoader = false;
        state.expenses = action.payload.data;
        state.error = action.payload.error;
      });
  },
});

export const { setHeaderTitle } = apiSlice.actions;

export default apiSlice.reducer;
