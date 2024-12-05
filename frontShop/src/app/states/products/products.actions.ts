import { createAction, props } from "@ngrx/store"
import { Product } from "src/app/core/models/Product";

export const loadProducts = createAction(
    '[Item List] Load products',
    props<{name: string, page: string | number, user: string | number | undefined, category: string | number, id: string | number}>()
);

export const loadedProducts = createAction(
    '[Item List] Loaded Products',
    props<{status: number, products: Product[], count: number}>()
)

