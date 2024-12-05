import { ActionReducerMap } from "@ngrx/store";
import { CategoryState } from "../core/models/Category.state";
import { categoryReducer } from "./category/category.reducers";
import { ProductState } from "../core/models/Product.state";
import { productReducer } from "./products/products.reducer";
import { CartState } from "../core/models/Cart.state";
import { cartReducer } from "./cart/cart.reduces";

export interface AppState {
    categories: CategoryState,
    products: ProductState,
    cart: CartState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
    categories: categoryReducer,
    products: productReducer,
    cart: cartReducer
}
