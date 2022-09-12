import React, { ChangeEvent, useState } from "react";
import { Input, Table } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { Order } from "../../../../app/models/order";

interface Props {
  handleAddEntity (object: any): void;
}

export default function AdminAddOrder({handleAddEntity}:Props) {

  let orderObject = {
    orderId: uuid(),
    orderNumber: "",
    orderTotal: 0,
    orderStatus: "",
    orderComment: "",
  } as Order;

  const [product, setOrder] = useState(orderObject);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setOrder({ ...product, [name]: value });
    handleAddEntity(product);
  }



  return (
    <Table celled>

    </Table>
  );
}
