export interface OrderedProductsActions {
    productsToRemove:  OrderedProductData [],
    productsToAdd:  OrderedProductData [],
    productsToUpdate:  OrderedProductData []
}

export interface OrderedProductData{
    productId: string,
    quantity: number,
    unitPrice: number

}

