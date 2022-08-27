import React, { useEffect, useState } from "react";
import {useNavigate } from "react-router-dom";
import {Button, Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Product } from "../../../app/models/product";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    agent.Products.list().then((response) => {
      let products: Product[] = [];
      response.forEach((product: any) => {
        products.push(product);
      });
      setProducts(products);
    });
  }, []);

  return (
    <>
      <Button positive compact style={{marginTop: 15}}floated="right">Add Product</Button>
      <h1> Products </h1>

      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>SKU</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {products.map((product: any) => (
            <Table.Row
              key={product.productId}
              onClick={() => navigate(`/admin/Products/${product.productId}`)}
              style= {{cursor: "pointer"}}
            >
              <Table.Cell>{product.productName}</Table.Cell>
              <Table.Cell>{product.productSku}</Table.Cell>
              <Table.Cell>{product.productQuantity}</Table.Cell>
              <Table.Cell>{product.productPrice}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
