import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Supplier } from "../../../app/models/supplier";
import AdminMenu from "../AdminMenu";

export default function AdminSuppliers() {
  const [suppliers, setSupplier] = useState<Supplier[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    agent.Suppliers.list().then((response) => {
      let suppliers: Supplier[] = [];
      response.forEach((supplier: any) => {
        suppliers.push(supplier);
      });
      setSupplier(suppliers);
    });
  }, []);

  return (
    <>
      <AdminMenu activeItem="suppliers" />

      <h1> Suppliers </h1>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Company Name</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {suppliers.map((supplier: any) => (
            <Table.Row
              key={supplier.supplierId}
              onClick={() =>
                navigate(`/admin/Suppliers/${supplier.supplierId}`)
              }
              style={{ cursor: "pointer" }}
            >
              <Table.Cell>{supplier.companyName}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}
