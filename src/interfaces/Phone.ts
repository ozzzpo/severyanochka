import { FetchStatus, Nullable } from "./Common";

export interface PhoneKeyCreateRequest {
  phone: string;
}

export interface PhoneKeyInfo {
  key: string;
  phone: string;
  created_at: string;
  expires_at: string;
  verified_at: Nullable<string>;
  used_at: Nullable<string>;
  is_verified: boolean;
  is_used: boolean;
}

export interface PhoneKeyVerify {
  phone_key: string;
  code: string;
}

export interface PhonesState {
  phone: string;
  code: string;
  phoneKey: PhoneKeyInfo;
  isVerified: boolean;
  error: Nullable<string>;
  status: FetchStatus;
}
