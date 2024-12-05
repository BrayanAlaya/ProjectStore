import { Product } from "./Product";

export interface ProductState{
    status: number,
    loading: boolean,
    products: ReadonlyArray<Product>,
    count?: number
}
