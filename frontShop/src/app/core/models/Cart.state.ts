import { Cart } from "./Cart";

export interface CartState{
    status: number,
    loading: boolean,
    cart: ReadonlyArray<Cart>
}
