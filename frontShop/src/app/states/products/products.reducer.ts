import { createReducer, on } from "@ngrx/store";
import { ProductState } from "src/app/core/models/Product.state";
import { loadedProducts, loadProducts } from "./products.actions";

export const initialState: ProductState = {loading: true,  status: 0, products: [] }

export const productReducer = createReducer(
    initialState,
    on(loadProducts, (state) => {
        return { loading: true ,status: 0, products: []}
    }),
    on(loadedProducts, (state, { status, products, count}) => {
        return { loading: false, status: status, products: products , count: count}
    }),
)

