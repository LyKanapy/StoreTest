import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../../app/api/agent";
import { Order } from "../../../../app/models/order";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import { useStore } from "../../../../stores/store";
import DetailsTableRow from "../../../components/DetailsTableRow";
import DetailsTableRowCustomer from "../../../components/DetailsTableRowCustomer";
import AdminOrderedProductsList from "./AdminOrderedProductsList";

export default observer (function AdminProductDetails() {

  // MobX
  const { orderStore } = useStore();

  const [selectedOrder, setOrder] = useState<Order | undefined>();
  const [customerToChange, setCustomerToChange] = useState<string[]>();

  let { id } = useParams();

  useEffect(() => {
    orderStore.loadOrder(id!).then(() => {
      orderStore.setOriginalOrderedProducts();
    })
  }, []);

   // Save parameter to change customer to which this order is set to

  function handleSetUpdateCustomer(id: string) {
    let ids: string[] = [];
    ids.push(selectedOrder!.orderId);
    ids.push(id);
    setCustomerToChange(ids);
  }

  // Change customer to which this order is set to

  function handleUpdateCustomer() {
    if (customerToChange === undefined) {
      return;
    }
    if (customerToChange[0] === customerToChange[1]) {
      return;
    }
    agent.Orders.updateCustomer(customerToChange);
  }

  return (
    <>
      <Table celled key={orderStore.selectedOrder?.orderId}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {orderStore.selectedOrder?.orderNumber}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DetailsTableRow
            object={orderStore.selectedOrder}
            data={orderStore.selectedOrder?.orderNumber}
            dataKey="orderNumber"
            dataName="Order Number"
            updateData={orderStore.setOrderObject}
          />
          <DetailsTableRow
            object={orderStore.selectedOrder}
            data={orderStore.selectedOrder?.orderStatus}
            dataKey="orderStatus"
            dataName="Order Status"
            updateData={orderStore.setOrderObject}
          />
          <DetailsTableRow
            object={orderStore.selectedOrder}
            data={orderStore.selectedOrder?.orderTotal}
            dataKey="orderTotal"
            dataName="Total"
            updateData={orderStore.setOrderObject}
          />
          <DetailsTableRow
            object={orderStore.selectedOrder}
            data={orderStore.selectedOrder?.orderDate}
            dataKey="orderDate"
            dataName="Order Date"
            updateData={orderStore.setOrderObject}
          />
          <DetailsTableRowCustomer/>
        </Table.Body>
      </Table>

      <AdminOrderedProductsList/>

      <Button
        floated="right"
        positive
        onClick={() => {
          orderStore.updateOrderCustomer();
          orderStore.editOrderedProducts();
          orderStore.editOrder();
          window.location.reload();
        }}
      >
        Save Changes
      </Button>
    </>
  );
})



