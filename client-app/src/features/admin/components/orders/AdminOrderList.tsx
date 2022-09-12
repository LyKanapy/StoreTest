import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { Order } from "../../../../app/models/order";
import { format } from "date-fns";

interface Props {
  orders: Order[];
}

export default function AdminOrderList({ orders }: Props) {
  const navigate = useNavigate();

  return (
    <>
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
        {orders.map((order: Order) => (
          <Table.Row
            key={order.orderId}
            onClick={() => navigate(`/admin/Orders/${order.orderId}`)}
            style={{ cursor: "pointer" }}
          >
            <Table.Cell>{order.orderNumber}</Table.Cell>
            <Table.Cell>
              {order.customer?.customerName} {order.customer?.customerSurname}
            </Table.Cell>
            <Table.Cell>
              {format(new Date(order.orderDate), "yyyy-MM-dd")}
            </Table.Cell>
            <Table.Cell>{order.orderStatus}</Table.Cell>
            <Table.Cell>{order.orderTotal}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </>
  );
}
