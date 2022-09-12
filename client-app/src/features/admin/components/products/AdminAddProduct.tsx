import React, { ChangeEvent, useState } from "react";
import { Input, Table } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { Product } from "../../../../app/models/product";

interface Props {
  handleAddEntity (object: any): void;
}

export default function AdminAddProduct({handleAddEntity}:Props) {

  let productObject = {
    productId: uuid(),
    productName: "",
    productPrice: 0,
    productQuantity: 0,
    productSku: "",
  } as Product;

  const [product, setProduct] = useState(productObject);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });
    handleAddEntity(product);
  }



  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Product Name</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Product Name"
              value={product.productName}
              name="productName"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>SKU</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="SKU"
              value={product.productSku}
              name="productSku"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Quantity</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Quantity"
              value={product.productQuantity}
              name="productQuantity"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Price</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Price"
              value={product.productPrice}
              name="productPrice"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
