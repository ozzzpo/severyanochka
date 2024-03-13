import { createAsyncThunk } from "@reduxjs/toolkit";
import { phoneApi } from "../../api/services/phone.service";
import { PhoneKeyVerify } from "../../interfaces/Phone";

export const getPhoneKey = createAsyncThunk(
  "phones/getPhoneKey",
  async (key: string, { rejectWithValue }) => {
    try {
      const response = await phoneApi.getPhoneKey(key);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error);
    }
  }
);

export const createPhoneKey = createAsyncThunk(
  "phones/createPhoneKey",
  async (phone: string, { rejectWithValue }) => {
    try {
      const response = await phoneApi.createPhoneKey({ phone });
      if (localStorage.getItem("phoneInfo")) {
        localStorage.removeItem("phoneInfo");
        localStorage.setItem("phoneInfo", JSON.stringify(response.data));
      } else {
        localStorage.setItem("phoneInfo", JSON.stringify(response.data));
      }
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const verifyPhoneKey = createAsyncThunk(
  "phones/verifyPhoneKey",
  async (data: PhoneKeyVerify, { rejectWithValue }) => {
    try {
      const response = await phoneApi.verifyPhoneKey(data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);
