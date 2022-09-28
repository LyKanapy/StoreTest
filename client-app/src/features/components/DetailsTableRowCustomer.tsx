import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { Button, ButtonGroup, Dropdown, Table } from "semantic-ui-react";
import { Customer } from "../../app/models/customer";
import { useStore } from "../../stores/store";

export default observer(function DetailsTableRowCustomer() {
  // MobX
  const { customerStore, orderStore } = useStore();

  const [customerId, setId] = useState("");
  const [editMode, setEditMode] = useState(false);

  let customersDropdown: any = [];

  customerStore.customers.map((customer) => {
    let object = { key: "", value: "", text: "" };
    object.key = customer.customerId;
    object.value = customer.customerId;
    object.text = `${customer.customerName} ${customer.customerSurname}`;
    customersDropdown.push(object);
  });

  function handleOnChange(e: any, data: any) {
    setId(data.value);
    console.log(data.value);
  }

  function renderNewCustomerValue() {
    let name = customerStore.customers.find(
      (x) => x.customerId === customerId
    )!.customerName;
    let surname = customerStore.customers.find(
      (x) => x.customerId === customerId
    )!.customerSurname;
    console.log(name);
    console.log(surname);
    if (orderStore.selectedOrder!.customer) {
      orderStore.selectedOrder!.customer.customerName = name;
      orderStore.selectedOrder!.customer.customerSurname = surname;
    } else {
      let customer = {
        customerName: name,
        customerSurname: surname,
      } as Customer;
      orderStore.selectedOrder!.customer = customer;
    }
  }
  

  return (
    <Table.Row>
      <Table.Cell width={4}>Customer</Table.Cell>

      <Table.Cell>
        {/* Edit mode OFF */}
        {!editMode && (
          <>
            <div style={{ display: "inline-block", padding: "0.45em 0" }}>
              {orderStore.selectedOrder?.customer?.customerName}{" "}
              {orderStore.selectedOrder?.customer?.customerSurname}
            </div>
            <Button
              size="tiny"
              positive
              onClick={() => {
                setEditMode(!editMode);
                customerStore.loadListCustomers();
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
              placeholder={`Select Customer`}
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
                  orderStore.idChangeCustomerTo(customerId);
                  setEditMode(!editMode);
                  renderNewCustomerValue();
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
});
