import { createAction, props } from "@ngrx/store"
import { Cart } from "src/app/core/models/Cart";

export const loadCart = createAction(
    '[Item List] Load Cart',
    props<{ token: string | number | undefined }>()
);

export const loadedCart = createAction(
    '[Item List] Loaded cart',
    props<{status: number, cart: Cart[] }>()
)

