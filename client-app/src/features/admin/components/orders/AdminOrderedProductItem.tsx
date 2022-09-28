import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, ButtonGroup, Input, Table } from "semantic-ui-react";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import { useStore } from "../../../../stores/store";

interface Props {
  orderedProduct: OrderedProduct | undefined;
}

export default observer(function AdminOrderedProductItem({
  orderedProduct,
}: Props) {
  // MobX
  const { orderStore } = useStore();

  const [editMode, setEditMode] = useState(false);
  const [quantityValue, setQuantityValue] = useState<number>(
    orderedProduct!.quantity
  );

  function updateOrderedProductValues(object: OrderedProduct) {
    let x: OrderedProduct = object;
    x.quantity = quantityValue;
    x.unitPrice = x.quantity * object.productPrice;
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
                orderStore.removeOrderedProduct(orderedProduct!.productId);
                console.log(orderedProduct!.productId);
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
                updateOrderedProductValues(orderedProduct!);
                orderStore.setTotalPrice();
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
});
