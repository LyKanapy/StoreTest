import React, {useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../../app/api/agent";
import { Order } from "../../../../app/models/order";
import DetailsTableRow from "../../../components/DetailsTableRow";
import EntityList from "../../../components/EntityList";
import AdminOrderedProductsList from "./AdminOrderedProductsList";


export default function AdminProductDetails() {
  const [selectedOrder, setOrder] = useState<Order | undefined>();
  let { id } = useParams();

  useEffect(() => {
    agent.Orders.details(id).then((response) => {
      let order = response;
      setOrder(order);
    });
  }, [id]);

  function handleEditProduct(order: Order) {
    agent.Orders.update(order);
  }

  function handleUpdateOrder(object: any) {
    setOrder(object);
  }

  return (
    <>
      <Table celled key={selectedOrder?.orderId}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {selectedOrder?.orderNumber}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderNumber}
            dataKey="orderNumber"
            dataName="Order Number"
            updateData={handleUpdateOrder}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderStatus}
            dataKey="orderStatus"
            dataName="Order Status"
            updateData={handleUpdateOrder}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderTotal}
            dataKey="orderTotal"
            dataName="Total"
            updateData={handleUpdateOrder}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderDate}
            dataKey="orderDate"
            dataName="Order Date"
            updateData={handleUpdateOrder}
          />
        </Table.Body>
      </Table>
     
      <EntityList
        title="Ordered Products"
        component={<AdminOrderedProductsList orderedProducts={selectedOrder?.orderedProducts}/>}
      />

      <Button
        floated="right"
        positive
        onClick={() => handleEditProduct(selectedOrder!)}
      >
        Save Changes
      </Button>
    </>
  );
}
