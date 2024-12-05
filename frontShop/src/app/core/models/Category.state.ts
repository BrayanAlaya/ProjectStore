import { Category } from "./Category";

export interface CategoryState{
    status: number,
    loading: boolean,
    categories: ReadonlyArray<Category>
}
