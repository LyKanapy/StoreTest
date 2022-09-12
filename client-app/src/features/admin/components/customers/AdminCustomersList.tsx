import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { Customer } from "../../../../app/models/customer";

interface Props {
    customers: Customer[]
}


export default function AdminCustomersList({customers}: Props) {

    const navigate = useNavigate();


    return (
        <>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>eMail</Table.HeaderCell>
            <Table.HeaderCell>Country</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {customers.map((customer: any) => (
            <Table.Row
              key={customer.customerId}
              onClick={() =>
                navigate(`/admin/Customers/${customer.customerId}`)
              }
              style={{ cursor: "pointer" }}
            >
              <Table.Cell>
                {customer.customerName} {customer.customerSurname}
              </Table.Cell>
              <Table.Cell>{customer.customerEmail}</Table.Cell>
              <Table.Cell>{customer.customerAdressCountry}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        </>
    )
}