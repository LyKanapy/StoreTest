import { Product } from "./product"

export interface Category {
    categoryId: string,
    categoryName: string,
    products: Product[]
  }