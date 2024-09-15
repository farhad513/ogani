import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { base_url } from "../../utils/config";
export const add_friend = createAsyncThunk(
  "chat/add_friend",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/chat/user/add-user-friend`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const send_message = createAsyncThunk(
  "chat/send_message",
  async (info, { rejectWithValue, fulfillWithValue, getState }) => {
    const { token } = getState().user;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const { data } = await axios.post(
        `${base_url}/api/chat/user/send_message_seller`,
        info,
        config
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const chatReducer = createSlice({
  name: "chat",
  initialState: {
    my_friends: [],
    fd_messages: [],
    currentfd: "",
    successMessage: "",
    errorMessage: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.fd_messages = [...state.fd_messages, payload];
    },
  },
  extraReducers: {
    [add_friend.fulfilled]: (state, { payload }) => {
      state.fd_messages = payload.messages;
      state.currentfd = payload.currentSeller;
      state.my_friends = payload.myFriends;
    },
    [send_message.fulfilled]: (state, { payload }) => {
      let tempFriends = state.my_friends;
      let index = tempFriends.findIndex(
        (f) => f.fndId === payload.message.receverId
      );
      while (index > 0) {
        let temp = tempFriends[index];
        tempFriends[index] = tempFriends[index - 1];
        tempFriends[index - 1] = temp;
        index--;
      }
      state.my_friends = tempFriends;
      state.fd_messages = [...state.fd_messages, payload.message];
      state.successMessage = "Success";
    },
  },
});

export const { messageClear, updateMessage } = chatReducer.actions;
export default chatReducer.reducer;
