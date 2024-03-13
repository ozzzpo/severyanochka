import { createAsyncThunk } from "@reduxjs/toolkit";
import { categoriesApi } from "../../api/services/categories.service";
import { CategoryCreate, CategoryUpdate } from "../../interfaces/Categories";

export const getAllCategories = createAsyncThunk(
  "categories/getAllCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.getCategories();
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/addCategory",
  async (data: CategoryCreate, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.createCategory(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (data: CategoryUpdate, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.updateCategory(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await categoriesApi.deleteCategory(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
