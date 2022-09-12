import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../../../app/api/agent";
import { Customer } from "../../../../app/models/customer";
import AddEntityModal from "../../../components/AddEntityModal";
import EntityList from "../../../components/EntityList";
import AdminMenu from "../../AdminMenu";
import AdminCustomersList from "./AdminCustomersList";
import AdminAddCustomer from "./AdminsAddCustomer";

export default function AdminProducts() {
  const [customers, setCustomer] = useState<Customer[]>([]);
  const navigate = useNavigate();
  const [customerToAdd, setCustomerToAdd] = useState<Customer>();

  // Database interactions
  // Create Customers list

  useEffect(() => {
    agent.Customers.list().then((response) => {
      let customers: Customer[] = [];
      response.forEach((customer: any) => {
        customers.push(customer);
      });
      setCustomer(customers);
    });
  }, []);

    // Add customer to database

  function handleCreateCustomer(customer: Customer) {
    agent.Customers.create(customer).then(() => {
      setCustomer([...customers, customer]);
      navigate(`/admin/Customers/${customer.customerId}`);
    });
  }

  // Other functions

  function handleCustomerToAdd(customer: Customer) {
    setCustomerToAdd(customer);
  }

  function handleAdd() {
    handleCreateCustomer(customerToAdd!);
  }





  return (
    <>
      <AdminMenu activeItem="customers"/>

      <AddEntityModal
        actionName="Add Customer"
        onAction={handleAdd}
        component={<AdminAddCustomer handleAddEntity={handleCustomerToAdd}/>}
      />

      <EntityList title="Customers" component={<AdminCustomersList customers={customers}/>}/>
    </>
  );
}
