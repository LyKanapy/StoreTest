export interface OrderedProductsActions {
    productsToRemove:  OrderedProductData [],
    productsToAdd:  OrderedProductData [],
    ProductsToUpdate:  OrderedProductData []
}

export interface OrderedProductData{
    productId: string,
    quantity: number
}

