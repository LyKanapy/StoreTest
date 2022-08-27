import React, { useEffect, useState } from "react";
import { Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Customer } from "../../../app/models/customer";
import { Product } from "../../../app/models/product";

export default function AdminProducts() {
  const [customers, setProducts] = useState<Customer[]>([]);

  useEffect(() => {
    agent.Customers.list().then((response) => {
      let customers: Customer[] = [];
      response.forEach((customer: any) => {
        customers.push(customer);
      });
      setProducts(customers);
    });
  }, []);

  return (
    <>
      <h1> Customers</h1>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>eMail</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((customer:any) => (
            <Table.Row key = {customer.customerId}>
              <Table.Cell>{customer.customerName} {customer.customerSurname}</Table.Cell>
              <Table.Cell>{customer.customerEmail}</Table.Cell>
              <Table.Cell>{customer.customerAdressCountry}</Table.Cell>
            </Table.Row>
          ))
          }
        </Table.Body>
      </Table>
    </>
  );
}
