import React, { ChangeEvent, useState } from "react";
import { Customer } from "../../../../app/models/customer";
import { v4 as uuid } from "uuid";
import { Input, Table } from "semantic-ui-react";

interface Props {
    handleAddEntity (object: any): void;
  }

export default function AdminAddCustomer ({handleAddEntity}:Props) {

let customerObject = {
    customerId: uuid(),
    customerName: "",
    customerSurname: "",
    customerPhone: "",
    customerEmail: "",
    customerAdressCountry: "",
    customerAdressCity: "",
    customerAdressStreet: "",
    customerAdressHouse: "",
} as Customer;

const [customer, setCustomer] = useState(customerObject);

function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setCustomer({ ...customer, [name]: value });
    handleAddEntity(customer);
  }

return (

    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Name</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's Name"
              value={customer.customerName}
              name="customerName"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Surname</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's Surname"
              value={customer.customerSurname}
              name="customerSurname"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Phone</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's phone number"
              value={customer.customerPhone}
              name="customerPhone"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>E-mail</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's e-mail address"
              value={customer.customerPhone}
              name="customerPhone"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Country</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's address country"
              value={customer.customerAdressCountry}
              name="customerAdressCountry"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>City</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's address city"
              value={customer.customerAdressCity}
              name="customerAdressCity"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Street</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's address street"
              value={customer.customerAdressStreet}
              name="customerAdressStreet"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>House</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's address haouse"
              value={customer.customerAdressHouse}
              name="customerAdressHouse"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>City</Table.Cell>
          <Table.Cell>
            <Input
              placeholder="Customer's address haouse"
              value={customer.customerAdressHouse}
              name="customerAdressHouse"
              onChange={handleInputChange}
            ></Input>
          </Table.Cell>
        </Table.Row>
      
      </Table.Body>
    </Table>
)



}