import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../../api/services/user.service";
import { updateStorageUser } from "../auth/actions";
import { User } from "../../interfaces/User";

export const updateAvatar = createAsyncThunk(
  "user/updateAvatar",
  async (formData: FormData, { rejectWithValue, dispatch }) => {
    try {
      const response = await userApi.setAvatar(formData);
      dispatch(updateStorageUser());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  "user/deleteAvatar",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await userApi.deleteAvatar();
      dispatch(updateStorageUser());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateMe = createAsyncThunk(
  "user/updateUser",
  async (data: Partial<User>, { rejectWithValue, dispatch }) => {
    try {
      const response = await userApi.updateMe(data);
      dispatch(updateStorageUser());
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
