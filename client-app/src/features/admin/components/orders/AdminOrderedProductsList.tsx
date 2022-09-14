import { ifError } from "assert";
import React, { useEffect, useState } from "react";
import { Button, Dropdown, Input, Table } from "semantic-ui-react";
import agent from "../../../../app/api/agent";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import { Product } from "../../../../app/models/product";
import AddEntityModal from "../../../components/AddEntityModal";
import AdminAddOrderedProduct from "./AdminAddOrderedProduct";
import AdminOrderedProductItem from "./AdminOrderedProductItem";

interface Props {
  orderedProducts: OrderedProduct[] | undefined;
  handleProductToAdd (product: Product) : void;
  handleRemoveProduct (id: string) : void;
  handleAdd () : void;
  productsData:  OrderedProduct[] | undefined
}

export default function AdminOrderedProductsList({ handleRemoveProduct, productsData, handleProductToAdd, handleAdd }: Props) {

  return (
    <>
      <AddEntityModal
        actionName="Add Product"
        onAction={handleAdd}
        component={
          <AdminAddOrderedProduct handleAddEntity={handleProductToAdd} />
        }
      />

      <h1>OrderedProducts</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Product

            </Table.HeaderCell>
            <Table.HeaderCell>Sku</Table.HeaderCell>
            <Table.HeaderCell>Ordered qnt.</Table.HeaderCell>
            <Table.HeaderCell>Item Price, EUR</Table.HeaderCell>
            <Table.HeaderCell>Total Price, EUR</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {productsData?.map((orderedProduct: OrderedProduct | undefined) => (
            <AdminOrderedProductItem
              key={orderedProduct?.productId}
              handleRemoveProduct={handleRemoveProduct}
              orderedProduct={orderedProduct}
            />
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
