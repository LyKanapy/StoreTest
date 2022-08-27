import React from "react";
import AdminCustomers from "./components/AdminCustomers";
import AdminOrders from "./components/AdminOrders";
import AdminProducts from "./components/AdminProducts";
import AdminSuppliers from "./components/AdminSuppliers";

export default function AdminPage () {
    return (
        <>
            <h1>This is admin page</h1>
            <AdminProducts/>
            <AdminCustomers/>
            <AdminOrders/>
            <AdminSuppliers/>
        </>
    )
}