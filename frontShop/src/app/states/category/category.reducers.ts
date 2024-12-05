import { createReducer, on } from "@ngrx/store";
import { CategoryState } from "src/app/core/models/Category.state";
import { loadCategories, loadedCategories } from "./category.actions";

export const initialState: CategoryState = {status: 0, loading: false, categories: [] }

export const categoryReducer = createReducer(
    initialState,
    on(loadCategories, (state) => {
        return { ...state, loading: true}
    }),
    on(loadedCategories, (state, { categories }) => {
        return { ...state, loading: false, categories: categories }
    }),
)

