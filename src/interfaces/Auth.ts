import { FetchStatus, Nullable } from "./Common";
import { User } from "./User";

export interface TokenResponse {
  access_token: string;
  token_type: string;
}
export interface LoginRequest {
  username: string;
  password: string;
}
export interface RegisterRequest {
  phone_key: string;
  password: string;
}
export interface PasswordResetRequest extends RegisterRequest {}

export interface RegisterResponse {
  user: User;
  token: TokenResponse;
}

export interface AuthState {
  status: FetchStatus;
  error: Nullable<string>;
  isAuth: boolean;
}
