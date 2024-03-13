import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../interfaces/Auth";
import { getMe, onLogin, onRegister } from "./actions";

const userStorage = localStorage.getItem("user");
const authState: AuthState = {
  status: "idle",
  error: null,
  isAuth: userStorage ? true : false,
};
const authSlice = createSlice({
  name: "auth",
  initialState: authState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("phoneInfo");
      state.isAuth = false;
      document.location.reload();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(onRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(onRegister.fulfilled, (state) => {
        state.status = "ready";
        state.isAuth = true;
      })
      .addCase(onRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = `${action.payload}`;
      })
      .addCase(onLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(onLogin.fulfilled, (state) => {
        state.status = "ready";
        state.isAuth = true;
      })
      .addCase(onLogin.rejected, (state, action) => {
        state.status = "failed";
        console.log(action.payload);
        state.error = `${action.payload}`;
      })
      .addCase(getMe.fulfilled, (state, action) => {});
  },
});
export default authSlice.reducer;
export const { logout } = authSlice.actions;
