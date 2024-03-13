import { createSlice } from "@reduxjs/toolkit";
import { PhonesState } from "../../interfaces/Phone";
import { createPhoneKey, getPhoneKey, verifyPhoneKey } from "./actions";

const phonesState: PhonesState = {
  phone: "",
  code: "",
  phoneKey: {
    key: "",
    phone: "",
    created_at: "",
    expires_at: "",
    used_at: "",
    verified_at: "",
    is_used: false,
    is_verified: false,
  },
  isVerified: false,
  error: null,
  status: "idle",
};

const phonesSlice = createSlice({
  name: "phones",
  initialState: phonesState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    saveTempPhone: (state, action) => {
      state.phone = action.payload;
    },
    saveTempCode: (state, action) => {
      state.code = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPhoneKey.fulfilled, (state, action) => {
        if (action.payload) {
          state.phoneKey = action.payload;
          state.phone = action.payload.phone;
        }
      })
      .addCase(createPhoneKey.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPhoneKey.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "ready";
          state.phoneKey = action.payload;
          state.phone = action.payload.phone;
        }
      })
      .addCase(createPhoneKey.rejected, (state) => {
        state.error = "Не удалось отправить код";
        state.status = "failed";
      })
      .addCase(verifyPhoneKey.pending, (state) => {
        state.status = "loading";
      })
      .addCase(verifyPhoneKey.fulfilled, (state, action) => {
        if (action.payload) {
          state.status = "ready";
          state.phoneKey = action.payload;
          state.phone = action.payload.phone;
          state.isVerified = true;
        }
      })
      .addCase(verifyPhoneKey.rejected, (state) => {
        state.error = "Не удалось верифицировать код";
        state.status = "failed";
      });
  },
});
export default phonesSlice.reducer;
export const { resetError, saveTempPhone, saveTempCode } = phonesSlice.actions;
