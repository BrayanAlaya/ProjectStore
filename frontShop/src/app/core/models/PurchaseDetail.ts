import { Product } from "./Product";

export interface PurchaseDetail{
    id?: number,
    purchase_id?: number,
    product_id?: number,
    monto?: number | string,
    amount?: number | string,
    products?: Product
}