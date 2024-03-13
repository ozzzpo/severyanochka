import { createSlice } from "@reduxjs/toolkit";
import { CategoryState } from "../../interfaces/Categories";
import { getAllCategories } from "./actions";
const categoriesState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};
const categoriesSlice = createSlice({
  name: "categories",
  initialState: categoriesState,
  reducers: {
    createAppCategory: (state, action) => {
      const parent = state.categories.find(
        (category) => category.id === action.payload.parent_id
      );
      if (parent) {
        //@ts-ignore
        parent.child.push(action.payload);
      } else {
        state.categories.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategories.pending, (state, action) => {})
      .addCase(getAllCategories.fulfilled, (state, action) => {
        if (action.payload) {
          state.categories = action.payload;
        }
      });
  },
});
export default categoriesSlice.reducer;
export const { createAppCategory } = categoriesSlice.actions;
