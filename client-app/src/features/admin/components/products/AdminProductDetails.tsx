import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import DetailsTableRow from "../../../components/DetailsTableRow";
import DetailsTableRowCategory from "../../../components/DetailsTableRowCategory";

export default observer(function AdminProductDetails() {
  // MobX
  const { productStore } = useStore();

  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    productStore.loadProduct(id!);
  }, []);

  return (
    <>
      <Table celled key={productStore.selectedProduct?.productId}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {productStore.selectedProduct?.productName}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DetailsTableRow
            object={productStore.selectedProduct}
            data={productStore.selectedProduct?.productName}
            dataKey="productName"
            dataName="Name"
            updateData={productStore.updateProductObject}
          />
          <DetailsTableRow
            object={productStore.selectedProduct}
            data={productStore.selectedProduct?.productSku}
            dataKey="productSku"
            dataName="SKU"
            updateData={productStore.updateProductObject}
          />
          <DetailsTableRow
            object={productStore.selectedProduct}
            data={productStore.selectedProduct?.productQuantity}
            dataKey="productQuantity"
            dataName="Quantity"
            updateData={productStore.updateProductObject}
          />
          <DetailsTableRow
            object={productStore.selectedProduct}
            data={productStore.selectedProduct?.productPrice}
            dataKey="productPrice"
            dataName="Price"
            updateData={productStore.updateProductObject}
          />
          <DetailsTableRowCategory/>
        </Table.Body>
      </Table>
      <Button
        floated="right"
        positive
        onClick={() => {
          productStore.editProduct(productStore.selectedProduct!);
          productStore.updateProductCategory();
        }}
      >
        Save Changes
      </Button>
      <Button
        floated="right"
        negative
        onClick={() => {
          productStore.deleteProduct(productStore.selectedProduct!.productId);
          setTimeout(() => navigate(`/admin/Products`), 1000);
        }}
      >
        Delete Product
      </Button>
    </>
  );
});
