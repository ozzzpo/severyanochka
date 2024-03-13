import { AxiosResponse } from "axios";

export type Nullable<T> = T | null;
export type ApiResponse<T> = Promise<AxiosResponse<T>>;
export type FetchStatus = "idle" | "loading" | "ready" | "failed";
export interface Option {
  value: string | number;
  label: string;
  children?: Option[];
}

export interface TreeSelectOption {
  value: string | number;
  title: string;
  children?: TreeSelectOption[];
}
