import React, { Fragment, useEffect, useState } from "react";
import "../../App.css";
import { Container, Grid, GridColumn, Header, List } from "semantic-ui-react";
import agent from "../api/agent";
import { Product } from "../models/product";
import ProductGridItem from "../../features/frontStore/ProductGriditem";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import HomePage from "../../features/homePage";
import NavigationBar from "./NavigationBar";
import ProductPage from "../../features/frontStore/products/ProductPage";

function App() {
  return (
    <Fragment>
        <Container>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/Products" element={<ProductPage />} />
          </Routes>
        </Container>
    </Fragment>
  );
}

export default App;
