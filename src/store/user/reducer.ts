import { createSlice } from "@reduxjs/toolkit";
import { getMe, updateStorageUser } from "../auth/actions";
import { UserState } from "../../interfaces/User";
const userStorage = localStorage.getItem("user");
const userFromStorage = userStorage
  ? JSON.parse(userStorage)
  : {
      first_name: "",
      last_name: "",
      birthday: "",
      id: 0,
      created_at: "",
      avatar_url: null,
      is_superuser: false,
      phone: "",
    };
const userState: UserState = {
  user: userFromStorage,
  status: "idle",
};
const userSlice = createSlice({
  name: "user",
  initialState: userState,
  reducers: {
    deleteAppAvatar: (state) => {
      state.user.avatar_url = null;
    },
    addAppAvatar: (state, action) => {
      state.user.avatar_url = action.payload;
    },
    updateAppUser: (state, action) => {
      Object.keys(action.payload).forEach((key) => {
        if (action.payload[key]) {
          //@ts-ignore
          state.user[key] = action.payload[key];
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateStorageUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateStorageUser.fulfilled, (state) => {
        state.status = "ready";
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      });
  },
});

export default userSlice.reducer;
export const { deleteAppAvatar, addAppAvatar, updateAppUser } =
  userSlice.actions;
