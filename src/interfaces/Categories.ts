import { FetchStatus, Nullable } from "./Common";

export interface Category {
  name: string;
  id: number;
  parent_id: Nullable<number>;
  child: Category[] | [];
}
export interface CategoryCreate {
  name: string;
  parent_id: Nullable<number>;
}

export interface CategoryUpdate extends CategoryCreate {
  updateId: number;
}

export interface CategoryState {
  categories: Category[];
  status: FetchStatus;
  error: Nullable<string>;
}
