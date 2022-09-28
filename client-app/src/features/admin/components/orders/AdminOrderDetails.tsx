import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Header, Segment, Table } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import DetailsTableRow from "../../../components/DetailsTableRow";
import DetailsTableRowCustomer from "../../../components/DetailsTableRowCustomer";
import DetailsTableRowStatic from "../../../components/DetailsTableRowStatic";
import AdminOrderedProductsList from "./AdminOrderedProductsList";
import { format } from "date-fns";

export default observer(function AdminOrderDetails() {
  // MobX
  const { orderStore } = useStore();

  const [date, setDate] = useState("");
  const navigate = useNavigate();

  let { id } = useParams();

  useEffect(() => {
    orderStore.loadOrder(id!).then(() => {
      orderStore.setOriginalOrderedProducts();
      setDate(
        format(new Date(orderStore.selectedOrder!.orderDate), "yyyy-MM-dd")
      );
      console.log(orderStore.selectedOrder?.orderedProducts);
    });
  }, [id]);

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
          <DetailsTableRowCustomer />
          <DetailsTableRow
            object={orderStore.selectedOrder}
            data={orderStore.selectedOrder?.orderStatus}
            dataKey="orderStatus"
            dataName="Order Status"
            updateData={orderStore.setOrderObject}
          />
          <DetailsTableRow
            object={orderStore.selectedOrder}
            data={orderStore.selectedOrder?.orderComment}
            dataKey="orderComment"
            dataName="Comment"
            updateData={orderStore.setOrderObject}
          />
          <DetailsTableRowStatic data={date} dataName="Order Date" />
        </Table.Body>
      </Table>

      <AdminOrderedProductsList />

      <Segment.Group horizontal>
        <Segment textAlign="right">
          <h1>{orderStore.totalPrice} €</h1>
        </Segment>
      </Segment.Group>

      <Button
        floated="right"
        positive
        onClick={() => {
          orderStore.updateSetOrderCustomer(orderStore.selectedOrder!.orderId);
          orderStore.editOrderedProducts();
          orderStore.editOrder();
          window.location.reload();
        }}
      >
        Save Changes
      </Button>
      <Button
        floated="right"
        negative
        onClick={() => {
          orderStore.deleteOrder(orderStore.selectedOrder!.orderId);
          setTimeout(() => navigate(`/admin/Orders`), 1000);
        }}
      >
        Delete Product
      </Button>
    </>
  );
});
