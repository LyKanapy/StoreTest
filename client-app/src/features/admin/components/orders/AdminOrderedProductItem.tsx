import React, { useState } from "react";
import { Button, ButtonGroup, Input, Table } from "semantic-ui-react";
import { OrderedProduct } from "../../../../app/models/orderedProduct";

interface Props {
  orderedProduct: OrderedProduct | undefined;
  handleRemoveProduct: (id: string) => void;
}

export default function AdminOrderedProductItem({
  orderedProduct,
  handleRemoveProduct,
}: Props) {
  const [editMode, setEditMode] = useState(false);
  const [quantityValue, setQuantityValue] = useState<number>(orderedProduct!.quantity);
  const [product, setProduct] = useState<OrderedProduct>();

  function updateQuantityValue (object: OrderedProduct) {
    let x: OrderedProduct = object;
    x.quantity = quantityValue;
    setProduct(x)
}

  return (
    <Table.Row>
      <Table.Cell>{orderedProduct?.productName}</Table.Cell>
      <Table.Cell width={2}>{orderedProduct?.productSku}</Table.Cell>
      <Table.Cell width={2} textAlign="right">
        {!editMode && orderedProduct?.quantity}
        {editMode && (
          <Input
            size="small"
            onChange={(e) => setQuantityValue(+e.target.value)}
            style={{ visibility: editMode ? "visible" : "hidden" }}
            placeholder={orderedProduct?.quantity}
          ></Input>
        )}
      </Table.Cell>
      <Table.Cell width={2} textAlign="right">
        {orderedProduct?.productPrice}
      </Table.Cell>
      <Table.Cell width={2} textAlign="right">
        {orderedProduct?.unitPrice}
      </Table.Cell>
      <Table.Cell width={1}>
        {/* Edit mode OFF */}
        {!editMode && (
          <ButtonGroup floated="right" size="tiny">
            <Button
              color="orange"
              onClick={() => {
                setEditMode(!editMode);
              }}
            >
              Edit
            </Button>
            <Button
              color="red"
              onClick={() => {
                handleRemoveProduct(orderedProduct!.productId);
              }}
            >
              Remove
            </Button>
          </ButtonGroup>
        )}
        {/* Edit mode ON */}
        {editMode && (
          <ButtonGroup floated="right" size="tiny">
            <Button
              positive
              onClick={() => {
                setEditMode(!editMode);
                updateQuantityValue(orderedProduct!)
              }}
            >
              Save
            </Button>
            <Button
              onClick={() => {
                setEditMode(!editMode);
              }}
              negative
            >
              Cancel
            </Button>
          </ButtonGroup>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
