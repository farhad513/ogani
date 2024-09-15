import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base_url } from "../../utils/config";
import axios from "axios";
export const add_to_card = createAsyncThunk(
  "card/add_to_card",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/product/card/add`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products_card = createAsyncThunk(
  "card/get_products_card",
  async (userId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/product/get/card/products/${userId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_card_product = createAsyncThunk(
  "card/delete_card_product",
  async (card_id, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${base_url}/api/home/product/delete/card/${card_id}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_increment = createAsyncThunk(
  "card/quantity_increment",
  async (card_id, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/home/product/quantity-increment/${card_id}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const quantity_decrement = createAsyncThunk(
  "card/quantity_decrement",
  async (card_id, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.put(
        `${base_url}/api/home/product/quantity-decrement/${card_id}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_wishlist = createAsyncThunk(
  "wishlist/add_to_wishlist",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/product/wishlist/add`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const get_products_wishlist = createAsyncThunk(
  "wishlist/get_products_wishlist",
  async (userId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/get-wishlist-products/${userId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const delete_wishlist_product = createAsyncThunk(
  "wishlist/delete_wishlist_product",
  async (wishlistId, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.delete(
        `${base_url}/api/home/product/delete/wishlist/${wishlistId}`,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const cardReducer = createSlice({
  name: "card",
  initialState: {
    card_products: [],
    card_product_count: 0,
    wishlist: [],
    wishlist_count: 0,
    buy_product_item: 0,
    price: 0,
    shipping_fee: 0,
    outOfStock: [],
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    reset_count: (state, _) => {
      state.card_product_count = 0;
      state.wishlist_count = 0;
    },
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [add_to_card.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [add_to_card.fulfilled]: (state, { payload }) => {
      state.card_product_count = state.card_product_count + 1;
      state.successMessage = payload.message;
    },
    [get_products_card.fulfilled]: (state, { payload }) => {
      state.card_products = payload.card_products;
      state.price = payload.price;
      state.card_product_count = payload.card_product_count;
      state.outOfStock = payload.outOfStock;
      state.shipping_fee = payload.shipping_fee;
      state.buy_product_item = payload.buy_product_item;
    },
    [delete_card_product.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_increment.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [quantity_decrement.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [add_to_wishlist.rejected]: (state, { payload }) => {
      state.errorMessage = payload.error;
    },
    [add_to_wishlist.fulfilled]: (state, { payload }) => {
      // state.wishlist_count = state.wishlist_count + 1;
      state.wishlist_count =
        state.wishlist_count > 0 ? state.wishlist_count + 1 : 1;
      state.successMessage = payload.message;
    },
    [get_products_wishlist.fulfilled]: (state, { payload }) => {
      state.wishlist_count = payload.wishlistCount;
      state.wishlist = payload.wishlists;
    },
    [delete_wishlist_product.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
      state.wishlist = state.wishlist.filter(
        (p) => p._id !== payload.wishlistId
      );
      state.wishlist_count = state.wishlist_count - 1;
    },
  },
});

export const { messageClear, reset_count } = cardReducer.actions;
export default cardReducer.reducer;
