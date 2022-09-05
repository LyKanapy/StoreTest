import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Product } from "../../../app/models/product";
import DetailsTableRow from "../../snippets/DetailsTableRow";

export default function AdminProductDetails() {
  const [selectedProduct, setProduct] = useState<Product | undefined>();
  let { id } = useParams();

  useEffect(() => {
    agent.Products.details(id).then((response) => {
      let product = response;
      setProduct(product);
    });
  }, [id]);

  function handleEditProduct(product: Product) {
    agent.Products.update(product);
  }

  function handleUpdateProduct(object: any) {
    setProduct(object);
  }

  return (
    <>
      <Table celled key={selectedProduct?.productId}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {selectedProduct?.productName}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DetailsTableRow
            object={selectedProduct}
            data={selectedProduct?.productName}
            dataKey="productName"
            dataName="Name"
            updateData={handleUpdateProduct}
          />
          <DetailsTableRow
            object={selectedProduct}
            data={selectedProduct?.productSku}
            dataKey="productSku"
            dataName="SKU"
            updateData={handleUpdateProduct}
          />
          <DetailsTableRow
            object={selectedProduct}
            data={selectedProduct?.productQuantity}
            dataKey="productQuantity"
            dataName="Quantity"
            updateData={handleUpdateProduct}
          />
          <DetailsTableRow
            object={selectedProduct}
            data={selectedProduct?.productPrice}
            dataKey="productPrice"
            dataName="Price"
            updateData={handleUpdateProduct}
          />
          <DetailsTableRow
            object={selectedProduct}
            data={selectedProduct?.categoryName}
            dataKey="categoryName"
            dataName="Category"
            updateData={handleUpdateProduct}
          />
        </Table.Body>
      </Table>
      <Button
        floated="right"
        positive
        onClick={() => handleEditProduct(selectedProduct!)}
      >
        Save Changes
      </Button>
    </>
  );
}
