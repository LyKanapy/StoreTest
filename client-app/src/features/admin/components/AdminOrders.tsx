
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Order } from "../../../app/models/order";

export default function AdminProducts() {
  const [orders, serOrders] = useState<Order[]>([]);

  useEffect(() => {
    agent.Orders.list().then((response) => {
      let orders: Order[] = [];
      response.forEach((order: any) => {
        orders.push(order);
      });
      serOrders(orders);
    });
  }, []);

  return (
    <>
      <h1> Orders </h1>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Number</Table.HeaderCell>
            <Table.HeaderCell>Customer</Table.HeaderCell>
            <Table.HeaderCell>Order Date</Table.HeaderCell>
            <Table.HeaderCell>Order Status</Table.HeaderCell>
            <Table.HeaderCell>Total</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orders.map((order: any) => (
            <Table.Row key={order.orderId}>
              <Table.Cell>{order.orderNumber}</Table.Cell>
              <Table.Cell>
                {order.customer.customerName} {order.customer.customerSurname}
              </Table.Cell>
              <Table.Cell>
                {format(new Date(order.orderDate), "yyyy-MM-dd")}
              </Table.Cell>
              <Table.Cell>{order.orderStatus}</Table.Cell>
              <Table.Cell>{order.orderTotal}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}