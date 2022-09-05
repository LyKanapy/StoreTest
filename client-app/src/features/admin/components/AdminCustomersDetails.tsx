import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Customer } from "../../../app/models/customer";
import DetailsTableRow from "../../snippets/DetailsTableRow";

export default function AdminCustomerDetails() {
  const [selectedCustomer, setCustomer] = useState<Customer | undefined>();
  let { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    agent.Customers.details(id).then((response) => {
      let customer = response;
      setCustomer(customer);
    });
  }, [id]);

  function handleEditCustomer(customer: Customer) {
    delete customer.orders;
    agent.Customers.update(customer);
  }

  function handleUpdateCustomer(object: any) {
    setCustomer(object);
  }

  console.log(selectedCustomer);

  return (
    <>
      <Table celled key={selectedCustomer?.customerId}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {selectedCustomer?.customerName}{" "}
              {selectedCustomer?.customerSurname}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerName}
            dataKey="customerName"
            dataName="Name"
            updateData={handleUpdateCustomer}
          />
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerSurname}
            dataKey="customerSurname"
            dataName="Surname"
            updateData={handleUpdateCustomer}
          />
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerPhone}
            dataKey="customerPhone"
            dataName="Phone number"
            updateData={handleUpdateCustomer}
          />
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerEmail}
            dataKey="customerEmail"
            dataName="Email"
            updateData={handleUpdateCustomer}
          />
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerAdressCountry}
            dataKey="customerAdressCountry"
            dataName="Country"
            updateData={handleUpdateCustomer}
          />
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerAdressCity}
            dataKey="customerAdressCity"
            dataName="City"
            updateData={handleUpdateCustomer}
          />
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerAdressStreet}
            dataKey="customerAdressStreet"
            dataName="Street"
            updateData={handleUpdateCustomer}
          />
          <DetailsTableRow
            object={selectedCustomer}
            data={selectedCustomer?.customerAdressHouse}
            dataKey="customerAdressHouse"
            dataName="House"
            updateData={handleUpdateCustomer}
          />
        </Table.Body>
      </Table>

      <>
        <h1>
          {selectedCustomer?.customerName} {selectedCustomer?.customerSurname}{" "}
          Orders
        </h1>
        <Table key="orders" celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Number</Table.HeaderCell>
              <Table.HeaderCell>Order Date</Table.HeaderCell>
              <Table.HeaderCell>Order Status</Table.HeaderCell>
              <Table.HeaderCell>Total</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {selectedCustomer?.orders?.map((order: any) => (
              <Table.Row
                key={order.orderId}
                onClick={() => navigate(`/admin/Orders/${order.orderId}`)}
                style={{ cursor: "pointer" }}
              >
                <Table.Cell>{order.orderNumber}</Table.Cell>
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
      <Button
        floated="right"
        positive
        onClick={() => handleEditCustomer(selectedCustomer!)}
      >
        Save Changes
      </Button>
    </>
  );
}
