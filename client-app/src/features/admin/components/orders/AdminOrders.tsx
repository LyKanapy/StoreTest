import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../../../app/api/agent";
import { Order } from "../../../../app/models/order";
import AddEntityModal from "../../../components/AddEntityModal";
import EntityList from "../../../components/EntityList";
import AdminMenu from "../../AdminMenu";
import AdminAddOrder from "./AdminAddOrder";
import AdminOrderList from "./AdminOrderList";

export default function AdminProducts() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderToAdd, setOrderToAdd] = useState<Order>();
  const navigate = useNavigate();

  // Database interactions
  // Create orders list

  useEffect(() => {
    agent.Orders.list().then((response) => {
      let orders: Order[] = [];
      response.forEach((order: any) => {
        orders.push(order);
      });
      setOrders(orders);
      console.log(orders);
    });
  }, []);

  // Add order to database

  function handleCreateOrder(order: Order) {
    agent.Orders.create(order).then(() => {
      setOrders([...orders, order]);
      navigate(`/admin/Orders/${order.orderId}`);
    });
  }

  // Other functions

  function handleOrderToAdd(order: Order) {
    setOrderToAdd(order);
  }

  function handleAdd() {
    handleCreateOrder(orderToAdd!);
  }

  return (
    <>
      <AdminMenu activeItem="orders" />

      <AddEntityModal
        actionName="Add Order"
        onAction={handleAdd}
        component={<AdminAddOrder handleAddEntity={handleOrderToAdd} />}
      />
      <EntityList
        title="Orders"
        component={<AdminOrderList orders={orders} />}
      />
    </>
  );
}
