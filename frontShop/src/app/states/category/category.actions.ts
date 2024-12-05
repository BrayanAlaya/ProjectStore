import { createAction, props } from "@ngrx/store"
import { Category } from "src/app/core/models/Category"


export const loadCategories = createAction(
    '[Item List] Load Categories'
);


export const loadedCategories = createAction(
    '[Item List] Loaded categories',
    props<{ categories: Category[] }>()
)

