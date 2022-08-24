export interface Product {
    productId: string
    productSku: string
    productName: string
    productPrice: number
    productQuantity: number
    category: Category
  }
  
  export interface Category {
    categoryId: string
    categoryName: string
  }
  