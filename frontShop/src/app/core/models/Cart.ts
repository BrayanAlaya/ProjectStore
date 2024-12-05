import { Product } from "./Product";

export interface Cart{
    id?: number,
    user_id?: number, 
    product_id?: number, 
    amount?: number, 
    products?: Product
}