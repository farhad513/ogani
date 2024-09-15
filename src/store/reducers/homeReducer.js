/* eslint-disable no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";
export const get_categorys = createAsyncThunk(
  "product/get_categorys",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/home/get_categorys`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.reponse.data);
    }
  }
);

export const get_products = createAsyncThunk(
  "product/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/home/get_products`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.reponse.data);
    }
  }
);
export const get_product = createAsyncThunk(
  "product/get_product",
  async (slug, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/get_product/${slug}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.reponse.data);
    }
  }
);

export const user_review = createAsyncThunk(
  "review/user_review",
  async (info, { fulfillWithValue, rejectWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/home/user/user-review`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.message);
    }
  }
);

export const get_reviews = createAsyncThunk(
  "review/get_reviews",
  async ({ productId, pageNumber }, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/user/get-reviews/${productId}?pageNumber=${pageNumber}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.reponse.data);
    }
  }
);

export const product_price_range = createAsyncThunk(
  "product/product_price_range",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/product_price_range_latest`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.reponse.data);
    }
  }
);

export const queryProducts = createAsyncThunk(
  "product/queryProducts",
  async (query, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${base_url}/api/home/query-products?category=${
          query.category
        }&&rating=${query.rating}&&lowPrice=${query.low}&highPrice=${
          query.high
        }&&sortPrice=${query.sortPrice}&&pageNumber=${
          query.pageNumber
        }&&searchValue=${query.searchValue ? query.searchValue : ""}`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.reponse.data);
    }
  }
);

export const get_banners = createAsyncThunk(
  "banner/get_banners",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await axios.get(`${base_url}/api/banners`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const homeReducer = createSlice({
  name: "home",
  initialState: {
    categorys: [],
    products: [],
    totalProduct: 0,
    perPage: 12,
    loader: false,
    latestProduct: [],
    topRatedProduct: [],
    discountProduct: [],
    priceRange: {
      low: 0,
      high: 1000,
    },
    product: {},
    relatedProduct: [],
    moreProducts: [],
    errorMessage: "",
    successMessage: "",
    totalReview: 0,
    rating_review: [],
    reviews: [],
    banners: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [get_categorys.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [get_categorys.fulfilled]: (state, { payload }) => {
      state.categorys = payload.categorys;
      state.loader = false;
    },
    [get_categorys.rejected]: (state, { payload }) => {
      state.errorMessage = payload.response.data.error;
      state.loader = false;
    },
    [get_products.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.latestProduct = payload.latestProduct;
      state.topRatedProduct = payload.topRatedProduct;
      state.discountProduct = payload.discountProduct;
      state.loader = false;
    },
    [get_products.rejected]: (state, { payload }) => {
      state.errorMessage = payload.response.data.error;
      state.loader = false;
    },
    [product_price_range.fulfilled]: (state, { payload }) => {
      state.latestProduct = payload.latestProduct;
      state.priceRange = payload.priceRange;
    },
    [queryProducts.fulfilled]: (state, { payload }) => {
      state.products = payload.products;
      state.totalProduct = payload.totalProduct;
      state.perPage = payload.perPage;
    },
    [get_product.fulfilled]: (state, { payload }) => {
      state.loader = true;
      state.product = payload.product;
      state.relatedProduct = payload.relatedProduct;
      state.moreProducts = payload.moreProducts;
      state.loader = false;
    },
    [user_review.fulfilled]: (state, { payload }) => {
      state.successMessage = payload.message;
    },
    [get_reviews.fulfilled]: (state, { payload }) => {
      state.totalReview = payload.totalReviews;
      state.rating_review = payload.rating_review;
      state.reviews = payload.reviews;
    },
    [get_banners.pending]: (state, { payload }) => {
      state.loader = true;
    },
    [get_banners.fulfilled]: (state, { payload }) => {
      state.banners = payload.banners;
    },
    [get_banners.rejected]: (state, { payload }) => {
      state.errorMessage = payload.response.data.error;
      state.loader = false;
    },
  },
});

export const { messageClear } = homeReducer.actions;
export default homeReducer.reducer;
