import { Product } from "./Product";

export interface Wishlist{
    id?: number,
    user_id?: number,
    product_id?: number,
    products?: Product
}