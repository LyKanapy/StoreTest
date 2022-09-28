import React, { ChangeEvent, useEffect, useState } from "react";
import { Dropdown, Input, Table } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { OrderToUpdate } from "../../../../app/models/order";
import { useStore } from "../../../../stores/store";

interface Props {
  handleAddEntity(object: any): void;
}

export default function AdminAddOrder({ handleAddEntity }: Props) {
  const { customerStore, orderStore } = useStore();
  const [dropDown, setDropDown] = useState([])

  let customersDropdown: any = [];

  useEffect(() => {
    if (customerStore.customers.length == 0) {
      customerStore.loadListCustomers().then(() => {
        customerStore.customers.map((customer) => {
          let object = { key: "", value: "", text: "" };
          object.key = customer.customerId;
          object.value = customer.customerId;
          object.text = `${customer.customerName} ${customer.customerSurname}`;
          customersDropdown.push(object);
        });
        setDropDown(customersDropdown)
        console.log("x");
      });
    }
  }, [customerStore.customers]);

  function handleOnChange(e: any, data: any) {
    orderStore.idChangeCustomerTo(data.value);
    console.log(data.value);
  }

  let orderObject = {
    orderId: uuid(),
    orderNumber: "",
    orderTotal: 0,
    orderDate: new Date(),
    orderStatus: "Active",
    orderComment: "",
  } as OrderToUpdate;

  const [order, setOrder] = useState(orderObject);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setOrder({ ...order, [name]: value });
    handleAddEntity(order);
  }

  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Order Number</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Order Number"
              name="orderNumber"
              value={order.orderNumber}
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Order Comment</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="SKU"
              name="orderComment"
              value={order.orderComment}
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Customer</Table.Cell>
          <Table.Cell>
            <Dropdown
              placeholder={`Select Customer`}
              search
              selection
              options={dropDown}
              onChange={handleOnChange}
            ></Dropdown>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
