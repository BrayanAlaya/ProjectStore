import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CategoryState } from "src/app/core/models/Category.state";

export const selectCategories = (state: AppState) => state.categories

export const categories = createSelector(
    selectCategories,
    (state: CategoryState) => {state.categories, state.loading}
)
