import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Order } from "../../../../app/models/order";
import { useStore } from "../../../../stores/store";
import AddEntityModal from "../../../components/AddEntityModal";
import EntityList from "../../../components/EntityList";
import AdminMenu from "../../AdminMenu";
import AdminAddOrder from "./AdminAddOrder";
import AdminOrderList from "./AdminOrderList";

export default observer(function AdminProducts() {
  // MobX
  const { orderStore } = useStore();

  const [orderToAdd, setOrderToAdd] = useState<Order>();
  const navigate = useNavigate();

  // Database interactions
  // Create orders list

  useEffect(() => {
    orderStore.loadListOrders();
    orderStore.listEdited = false;
  }, []);

  // Other functions

  function handleOrderToAdd(order: Order) {
    setOrderToAdd(order);
  }

  function handleAdd() {
    orderStore
      .createOrder(orderToAdd!)
      .then(() => navigate(`/admin/Orders/${orderToAdd!.orderId}`));
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
        component={<AdminOrderList orders={orderStore.orders} />}
      />
    </>
  );
});