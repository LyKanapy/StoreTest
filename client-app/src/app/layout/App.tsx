import React, { Fragment} from "react";
import "../../App.css";
import { Container} from "semantic-ui-react";
import { Route,  Routes } from "react-router-dom";
import HomePage from "../../features/HomePage";
import NavigationBar from "./NavigationBar";
import ProductPage from "../../features/frontStore/products/ProductPage";
import CategoryPage from "../../features/frontStore/CategoryPage";
import AdminPage from "../../features/admin/AdminPage";
import AdminProductDetails from "../../features/admin/components/AdminProductDetails";
import AdminCustomerDetails from "../../features/admin/components/AdminCustomersDetails";
import AdminOrderDetails from "../../features/admin/components/AdminOrderDetails";
import AdminSupplierDetails from "../../features/admin/components/AdminSupplierDetails";
import AdminProducts from "../../features/admin/components/AdminProducts";
import AdminCustomers from "../../features/admin/components/AdminCustomers";
import AdminOrders from "../../features/admin/components/AdminOrders";
import AdminSuppliers from "../../features/admin/components/AdminSuppliers";

function App() {
  return (
    <Fragment>
        <Container style={{paddingTop: 50}}>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Products/:id" element={<ProductPage />} />
            <Route path="/Categories/:id" element={<CategoryPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="admin/Products" element={<AdminProducts />}/>
            <Route path="admin/Products/:id" element={<AdminProductDetails />}/>
            <Route path="admin/Customers" element={<AdminCustomers />}/>
            <Route path="admin/Customers/:id" element={<AdminCustomerDetails />}/>
            <Route path="admin/Orders" element={<AdminOrders />}/>
            <Route path="admin/Orders/:id" element={<AdminOrderDetails />}/>
            <Route path="admin/Suppliers" element={<AdminSuppliers />}/>
            <Route path="admin/Suppliers/:id" element={<AdminSupplierDetails />}/>
          </Routes>
        </Container>
    </Fragment>
  );
}

export default App;
