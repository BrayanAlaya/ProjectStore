import { createReducer, on } from "@ngrx/store";
import { CartState } from "src/app/core/models/Cart.state";
import { loadCart, loadedCart } from "./cart.actions";

export const initialState: CartState = {status: 0, loading: false, cart: [] }

export const cartReducer = createReducer(
    initialState,
    on(loadCart, (state) => {
        return {...state, status: 0 ,loading: true, cart: [] }
    }),
    on(loadedCart, (state, {status , cart }) => {
        return {...state, status: status ,loading: true, cart: cart }
    }),
)

