import {
  Category,
  CategoryCreate,
  CategoryUpdate,
} from "../../interfaces/Categories";
import { ApiResponse } from "../../interfaces/Common";
import { apiClient } from "../instance";

export const categoriesApi = {
  getCategories: (): ApiResponse<Category[]> => {
    return apiClient.get<Category[]>("/categories/", {
      params: {
        depth: 3,
      },
    });
  },
  createCategory: (data: CategoryCreate): ApiResponse<Category> => {
    return apiClient.post<Category>("/categories/", data);
  },
  getCategory: (id: number): ApiResponse<Category> => {
    return apiClient.get<Category>(`/categories/${id}`);
  },
  updateCategory: (data: CategoryUpdate): ApiResponse<Category> => {
    return apiClient.patch<Category>(`/categories/${data.updateId}`, data);
  },
  deleteCategory: (id: number): ApiResponse<void> => {
    return apiClient.delete(`/categories/${id}`);
  },
};
