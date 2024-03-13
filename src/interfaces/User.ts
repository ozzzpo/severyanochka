import { FetchStatus, Nullable } from "./Common";

export interface User {
  first_name: string;
  last_name: string;
  birthday: string;
  id: number;
  created_at: string;
  is_superuser: boolean;
  phone: string;
  avatar_url: Nullable<string>;
}
export interface UserState {
  user: User;
  status: FetchStatus;
}
