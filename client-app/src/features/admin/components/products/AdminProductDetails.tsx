import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../../app/api/agent";
import { Product } from "../../../../app/models/product";
import DetailsTableRow from "../../../components/DetailsTableRow";
import DetailsTableRowCategory from "../../../components/DetailsTableRowCategory";

export default function AdminProductDetails() {
  const [selectedProduct, setProduct] = useState<Product | undefined>();
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    agent.Products.details(id).then((response) => {
      let product = response;
      setProduct(product);
    });
  }, [id]);

  function handleEditProduct(product: Product) {
    agent.Products.update(product);
  }

  function handleDeleteProduct(id: string) {
    agent.Products.delete(id);
  }

  function handleUpdateProduct(object: any) {
    setProduct(object);
  }

  function handleSelectedCategoryId (id: string) {
    setSelectedCategoryId(id);
  }

  function handleUpdateCategoryId (ids: string[]) {
      agent.Products.updateCategory(ids)
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
          <DetailsTableRowCategory
            object={selectedProduct}
            data={selectedProduct?.categoryName}
            dataKey="categoryName"
            dataName="Category"
            updateData={handleUpdateProduct}
            updateCategory={handleSelectedCategoryId}
          />
        </Table.Body>
      </Table>
      <Button
        floated="right"
        positive
        onClick={() => {
          handleEditProduct(selectedProduct!)
          handleUpdateCategoryId([selectedProduct!.productId, selectedCategoryId])
          console.log([selectedProduct!.productId, selectedCategoryId])
        }}
      >
        Save Changes
      </Button>
      <Button
        floated="right"
        negative
        onClick={() => {
          handleDeleteProduct(selectedProduct!.productId, )
          setTimeout(() => navigate(`/admin/Products`), 1000)  
        }}
      >
        Delete Product
      </Button>
    </>
  );
}
