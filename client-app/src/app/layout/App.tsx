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
            <Route path="admin/Products/:id" element={<AdminProductDetails />}/>
            <Route path="admin/Customers/:id" element={<AdminCustomerDetails />}/>
          </Routes>
        </Container>
    </Fragment>
  );
}

export default App;
