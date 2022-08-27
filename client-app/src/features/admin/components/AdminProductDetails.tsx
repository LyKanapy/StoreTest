import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Product } from "../../../app/models/product";

export default function AdminProductDetails() {
  const [selectedProduct, setProduct] = useState<Product>();
  let { id } = useParams();

  useEffect(() => {
    agent.Products.details(id).then((response) => {
      let product = response;
      setProduct(product);
    });
  }, []);

  return (
    <Table celled striped key={selectedProduct?.productId}>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="3">
            {selectedProduct?.productName}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell >
            {selectedProduct?.productName}
            {/* <Button size="tiny" floated="right" positive compact>
              Edit
            </Button> */}
          </Table.Cell>
          <Table.Cell width="1" textAlign="center" style= {{cursor: "pointer"}}>Edit</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
