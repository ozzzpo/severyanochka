import { ApiResponse } from "../../interfaces/Common";
import { apiClient } from "../instance";
import {
  LoginRequest,
  RegisterRequest,
  RegisterResponse,
  PasswordResetRequest,
  TokenResponse,
} from "../../interfaces/Auth";
import qs from "qs";
export const authApi = {
  login: (data: LoginRequest): ApiResponse<TokenResponse> => {
    return apiClient.post("/auth/login", qs.stringify(data));
  },
  register: (data: RegisterRequest): ApiResponse<RegisterResponse> => {
    return apiClient.post<RegisterResponse>("/auth/register", data);
  },
  resetPassword: (data: PasswordResetRequest): ApiResponse<string> => {
    return apiClient.post<string>("/auth/reset_password", data);
  },
};
