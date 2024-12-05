import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CartState } from "src/app/core/models/Cart.state";

export const selectCart = (state: AppState) => state.cart

export const categories = createSelector(
    selectCart,
    (state: CartState) => {state.status ,state.cart, state.loading}
)
