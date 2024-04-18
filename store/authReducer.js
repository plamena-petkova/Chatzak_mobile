import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import {
  allUsersRoute,
  createAvatarRoute,
  getUserByIdRoute,
  loginRoute,
  registerRoute,
  updateAvatarRoute,
} from "../utils/apiRoutes";
import axios from "axios";

const initialState = {
  user: {},
  allUsers: [],
  contacts: [],
  isLoading: false,
  error: null,
  avatarUrl: "",
  onlineUsers:{},
};

export const login = createAsyncThunk("user/login", async (data, thunkAPI) => {
  const { username, password } = data;
  const response = await axios.post(loginRoute, {
    username,
    password,
  });

  return response.data.user;
 
});


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.allUsers = [];
      state.user = {};
      state.contacts = {};
      state.isLoading = false;
      state.avatarUrl = "";
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    });
  },
});

export const { logout} = authSlice.actions;

export default authSlice.reducer;