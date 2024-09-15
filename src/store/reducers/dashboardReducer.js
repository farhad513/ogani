import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/config";
import axios from "axios";
export const get_dashboard_data = createAsyncThunk(
  "dashboard/get_dashboard_data",
  async (userId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/dashboard/get-dashboard-data/${userId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const dashboardReducer = createSlice({
  name: "dashboard",
  initialState: {
    recentOrders: [],
    successMessage: "",
    errorMessage: "",
    totalOrder: 0,
    pendingOrder: 0,
    cancelledOrder: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_dashboard_data.fulfilled]: (state, { payload }) => {
      state.recentOrders = payload.recentOrders;
      state.totalOrder = payload.totalOrder;
      state.pendingOrder = payload.pendingOrder;
      state.cancelledOrder = payload.cancelledOrder;
    },
  },
});

export const { messageClear } = dashboardReducer.actions;
export default dashboardReducer.reducer;
