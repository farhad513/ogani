/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwt from "jwt-decode";
import { base_url } from "../../utils/config";
import axios from "axios";
export const user_register = createAsyncThunk(
  "user/user_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await axios.post(`${base_url}/api/user/register`, info);
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);
export const user_login = createAsyncThunk(
  "user/user_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await axios.post(`${base_url}/api/user/login`, info);
      localStorage.setItem("userToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const decodeToken = (token) => {
  if (token) {
    const userInfo = jwt(token);
    const expired = new Date(userInfo.exp * 1000);
    if (new Date() > expired) {
      localStorage.removeItem("userToken");
      return "";
    } else {
      return userInfo;
    }
  } else {
    return "";
  }
};
export const authReducer = createSlice({
  name: "user",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: decodeToken(localStorage.getItem("userToken")),
    token: localStorage.getItem("userToken"),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    user_reset: (state, _) => {
      state.userInfo = "";
    },
  },
  extraReducers: {
    [user_register.pending]: (state, _) => {
      state.loader = true;
    },
    [user_register.rejected]: (state, { payload }) => {
      state.errorMessage = payload.response.data.error;
      state.loader = false;
    },
    [user_register.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;
      state.loader = false;
      state.userInfo = userInfo;
      state.token = payload.token;
    },
    [user_login.pending]: (state, _) => {
      state.loader = true;
    },
    [user_login.rejected]: (state, { payload }) => {
      state.errorMessage = payload.response.data.error;
      state.loader = false;
    },
    [user_login.fulfilled]: (state, { payload }) => {
      const userInfo = decodeToken(payload.token);
      state.successMessage = payload.message;``
      state.loader = false;
      state.userInfo = userInfo;
      state.token = payload.token;
    },
  },
});

export const { messageClear, user_reset } = authReducer.actions;
export default authReducer.reducer;
