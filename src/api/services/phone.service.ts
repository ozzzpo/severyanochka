import {
  PhoneKeyCreateRequest,
  PhoneKeyInfo,
  PhoneKeyVerify,
} from "../../interfaces/Phone";
import { apiClient } from "../instance";
import { ApiResponse } from "../../interfaces/Common";
export const phoneApi = {
  getPhoneKey: (phoneKey: string): ApiResponse<PhoneKeyInfo> => {
    return apiClient.get<PhoneKeyInfo>(`/phone_keys/${phoneKey}`);
  },
  createPhoneKey: (data: PhoneKeyCreateRequest): ApiResponse<PhoneKeyInfo> => {
    return apiClient.post<PhoneKeyInfo>("/phone_keys/", data);
  },
  verifyPhoneKey: (data: PhoneKeyVerify): ApiResponse<PhoneKeyInfo> => {
    return apiClient.post<PhoneKeyInfo>("/phone_keys/verify", data);
  },
};
