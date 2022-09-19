import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, Table } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Customer } from "../../app/models/customer";
import { Order } from "../../app/models/order";

interface Props {
  order: Order;
  updateData: (order: Order) => void;
  updateCustomer: (id: string) => void;
}

export default function DetailsTableRowCustomer({
  order,
  updateData,
  updateCustomer,
}: Props) {
  const [customerId, setId] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [customers, setCustomer] = useState<Customer[]>([]);
  let customersDropdown: any = [];

  function getCustomersList() {
    agent.Customers.list().then((response) => {
      let customers: Customer[] = [];
      response.forEach((customer: any) => {
        customers.push(customer);
      });
      setCustomer(customers);
    });
  }

  customers.map((customer) => {
    let object = { key: "", value: "", text: "" };
    object.key = customer.customerId;
    object.value = customer.customerId;
    object.text = `${customer.customerName} ${customer.customerSurname}`;
    customersDropdown.push(object);
  });

  function handleOnChange(e: any, data: any) {
    setId(data.value);
    order.customer.customerName = customers.find(x=>x.customerId===data.value)!.customerName;
    order.customer.customerSurname = customers.find(x=>x.customerId===data.value)!.customerSurname;
    console.log(data.value)
  }

  return (
    <Table.Row>
      <Table.Cell width={4}>Customer</Table.Cell>

      <Table.Cell>
        {/* Edit mode OFF */}
        {!editMode && (
          <>
            <div style={{ display: "inline-block", padding: "0.45em 0" }}>
              {order?.customer.customerName} {order?.customer.customerSurname}
            </div>
            <Button
              size="tiny"
              positive
              onClick={() => {
                setEditMode(!editMode);
                getCustomersList();
              }}
              floated="right"
            >
              Edit
            </Button>
          </>
        )}
        {/* Edit mode ON */}
        {editMode && (
          <>
            <Dropdown
              placeholder={`${order?.customer.customerName} ${order?.customer.customerSurname}`}
              search
              selection
              options={customersDropdown}
              onChange={handleOnChange}
            ></Dropdown>
            <ButtonGroup floated="right" size="tiny">
              <Button
                positive
                floated="right"
                onClick={() => {
                  updateData(order);
                  setEditMode(!editMode);
                  updateCustomer(customerId);
                }}
              >
                Save
              </Button>
              <Button
                negative
                floated="right"
                onClick={() => setEditMode(!editMode)}
              >
                Cancel
              </Button>
            </ButtonGroup>
          </>
        )}
      </Table.Cell>
    </Table.Row>
  );
}
