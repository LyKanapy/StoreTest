import { ifError } from "assert";
import React, { useEffect, useState } from "react";
import {Button, Table } from "semantic-ui-react";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import AdminOrderedProductItem from "./AdminOrderedProductItem";

interface Props {
  orderedProducts: OrderedProduct[] | undefined;
}

export default function AdminOrderedProductsList({ orderedProducts }: Props) {
  const [productsToShow, setProductsToShow] = useState<
    OrderedProduct[] | undefined
  >(orderedProducts);

  useEffect(() => {
    setProductsToShow(orderedProducts)
  }, [orderedProducts]);

  // const [removeProduct, setRemoveProduct] = useState<OrderedProductData[]>([]);
  // const [updateProduct, setUpdateProduct] = useState<OrderedProductData[]>([]);

  // function handleAddProduct (id: string, quantity: number) {
  //         let product = {
  //             productId: id,
  //             quantity: quantity
  //         } as OrderedProductData
  //         setAddProduct([...addProduct, product])
  // }

  // function handleRemoveProduct (id: string) {
  //     let noId = true;
  //     for (let i = 0; i < removeProduct.length; i++) {
  //         if (id == removeProduct[i].productId ) {
  //             noId = false;
  //         }
  //     }
  //     if (noId) {
  //         let product = {
  //             productId: id
  //         } as OrderedProductData
  //         setRemoveProduct([...removeProduct, product])
  //     }
  // }

  function handleRemoveProduct(id: string) {
    setProductsToShow(productsToShow!.filter((i) => i.productId !== id));
  }

  return (
    <>
      <Table.Header>

        <Table.Row>
          <Table.HeaderCell>Product      <Button 
        onClick={() => console.log(productsToShow)}
        ></Button></Table.HeaderCell>
          <Table.HeaderCell>Sku</Table.HeaderCell>
          <Table.HeaderCell>Ordered qnt.</Table.HeaderCell>
          <Table.HeaderCell>Item Price, EUR</Table.HeaderCell>
          <Table.HeaderCell>Total Price, EUR</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {productsToShow?.map((orderedProduct: OrderedProduct | undefined) => (
            <AdminOrderedProductItem 
            key={orderedProduct?.productId} 
            handleRemoveProduct={handleRemoveProduct} 
            orderedProduct={orderedProduct}
            // updateProduct={handleUpdateProduct}
            />
        ))}
      </Table.Body>


    </>
  );
}
