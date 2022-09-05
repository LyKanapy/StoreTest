import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "semantic-ui-react";

interface Props {
    activeItem: string;
  }
  

export default function AdminMenu({activeItem}:Props) {
  const navigate = useNavigate();

  return (
    <Menu tabular>
      <Menu.Item
        name="dashboard"
        active={activeItem === "dashboard"}
        onClick={() => {
          activeItem = "dashboard";
          navigate(`/admin`)
        }}
      />
      <Menu.Item
        name="products"
        active={activeItem === "products"}
        onClick={() => {
          activeItem = "products";
          navigate(`/admin/Products/`)
        }}
      />
      <Menu.Item
        name="customers"
        active={activeItem === "customers"}
        onClick={() => {
            activeItem = "customers";
            navigate(`/admin/Customers/`)
        }}
      />
      <Menu.Item
        name="orders"
        active={activeItem === "orders"}
        onClick={() => {
            activeItem = "orders";
            navigate(`/admin/Orders/`)
        }}
      />
      <Menu.Item
        name="suppliers"
        active={activeItem === "suppliers"}
        onClick={() => {
            activeItem = "suppliers";
            navigate(`/admin/Suppliers/`)
        }}
      />

    </Menu>
  );
}
