export interface Product {
    id?: number,
    name?: string,
    stock?: number,
    image?: Array<string> | string,
    price?: number,
    description?: string,
    createdDate?: string,
    category_id?: number,
    user_id?: number,
    eliminado?: number 
}