import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Supplier } from "../../../app/models/supplier";
import DetailsTableRow from "../../snippets/DetailsTableRow";

export default function AdminProductDetails() {
  const [selectedSupplier, setSupplier] = useState<Supplier | undefined>();
  let { id } = useParams();

  useEffect(() => {
    agent.Suppliers.details(id).then((response) => {
      let supplier = response;
      setSupplier(supplier);
    });
  }, [id]);

  function handleEdit(supplier: Supplier) {
    agent.Suppliers.update(supplier);
  }

  function handleUpdate(object: any) {
    setSupplier(object);
  }

  return (
    <>
      <Table celled key={selectedSupplier?.supplierId}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {selectedSupplier?.companyName}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DetailsTableRow
            object={selectedSupplier}
            data={selectedSupplier?.companyName}
            dataKey="companyName"
            dataName="Company Name"
            updateData={handleUpdate}
          />
        </Table.Body>
      </Table>
      <Button
        floated="right"
        positive
        onClick={() => handleEdit(selectedSupplier!)}
      >
        Save Changes
      </Button>
    </>
  );
}
