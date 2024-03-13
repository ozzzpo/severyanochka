import { ApiResponse } from "../../interfaces/Common";
import { User } from "../../interfaces/User";
import { apiClient } from "../instance";

export const userApi = {
  getMe: (): ApiResponse<User> => {
    return apiClient.get<User>("/users/me");
  },
  deleteMe: (): ApiResponse<string> => {
    return apiClient.delete<string>("/users/me");
  },
  updateMe: (data: Partial<User>): ApiResponse<User> => {
    return apiClient.patch("/users/me", data);
  },
  checkUser: (phone: string): ApiResponse<{ success: boolean }> => {
    return apiClient.get("users/check", {
      params: {
        phone,
      },
    });
  },
  setAvatar: (formData: FormData): ApiResponse<string> => {
    return apiClient.post("/users/me/avatar", formData);
  },
  deleteAvatar: () => {
    return apiClient.delete("/users/me/avatar");
  },
};
