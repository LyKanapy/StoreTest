import React, { Fragment, useEffect, useState } from "react";
import "../../App.css";
import { Container, Grid, GridColumn, Header, List } from "semantic-ui-react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "../../features/HomePage";
import NavigationBar from "./NavigationBar";
import ProductPage from "../../features/frontStore/products/ProductPage";
import CategoryPage from "../../features/frontStore/CategoryPage";
import AdminPage from "../../features/admin/AdminPage";
import AdminProductDetails from "../../features/admin/components/AdminProductDetails";

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
          </Routes>
        </Container>
    </Fragment>
  );
}

export default App;
