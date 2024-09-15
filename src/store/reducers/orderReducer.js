import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/config";
import axios from "axios";
export const place_order = createAsyncThunk(
  "order/place_order",
  async (
    { price, products, shipping_fee, shippingInfo, items, userId, navigate },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/order/place-order`,
        {
          price,
          products,
          shipping_fee,
          shippingInfo,
          items,
          userId,
          navigate,
        },
        config
      );
      navigate("/payment", {
        state: { price: price + shipping_fee, items, orderId: data.orderId },
      });
      return true;
    } catch (error) {
      // return rejectWithValue(error.response.data);
      console.log(error.response.data);
    }
  }
);

export const get_orders = createAsyncThunk(
  "order/get_orders",
  async (
    { userId, status },
    { rejectWithValue, fulfillWithValue, getState }
  ) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/order/get-orders/${userId}/${status}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_order_details = createAsyncThunk(
  "order/get_order_details",
  async (orderId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/order/get-order/details/${orderId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const orderReducer = createSlice({
  name: "order",
  initialState: {
    myOrders: [],
    successMessage: "",
    errorMessage: "",
    myOrder: {},
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_orders.fulfilled]: (state, { payload }) => {
      state.myOrders = payload.orders;
    },
    [get_order_details.fulfilled]: (state, { payload }) => {
      state.myOrder = payload.order;
    },
  },
});

export const { messageClear } = orderReducer.actions;
export default orderReducer.reducer;
