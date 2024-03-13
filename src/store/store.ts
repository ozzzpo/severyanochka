import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import auth from "./auth/reducer";
import phones from "./phones/reducer";
import categories from "./categories/reducer";
import user from "./user/reducer";
export const store = configureStore({
  reducer: {
    auth,
    phones,
    categories,
    user,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
