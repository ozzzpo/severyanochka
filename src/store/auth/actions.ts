import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LoginRequest,
  PasswordResetRequest,
  RegisterRequest,
} from "../../interfaces/Auth";
import { authApi } from "../../api/services/auth.service";
import { userApi } from "../../api/services/user.service";

export const onLogin = createAsyncThunk(
  "auth/onLogin",
  async (
    { username, password }: LoginRequest,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const response = await authApi.login({ username, password });
      console.log(response.data);
      localStorage.setItem("token", response.data.access_token);
      dispatch(getMe());
      return response.data;
    } catch (error: any) {
      return rejectWithValue(`${error}`);
    }
  }
);

export const onRegister = createAsyncThunk(
  "auth/onRegister",
  async ({ phone_key, password }: RegisterRequest, { rejectWithValue }) => {
    try {
      const response = await authApi.register({ phone_key, password });
      localStorage.setItem("token", response.data.token.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const onPasswordReset = createAsyncThunk(
  "auth/onPasswordReset",
  async (
    { phone_key, password }: PasswordResetRequest,
    { rejectWithValue }
  ) => {
    try {
      const response = await authApi.resetPassword({ phone_key, password });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const getMe = createAsyncThunk(
  "auth/getMe",
  async (_, { rejectWithValue }) => {
    try {
      const response = await userApi.getMe();
      const storageUser = localStorage.getItem("user");
      if (!storageUser) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const updateStorageUser = createAsyncThunk(
  "auth/updateStorageUser",
  async (_, { rejectWithValue }) => {
    const response = await userApi.getMe();
    const storageUser = localStorage.getItem("user");
    if (storageUser) {
      localStorage.removeItem("user");
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  }
);
