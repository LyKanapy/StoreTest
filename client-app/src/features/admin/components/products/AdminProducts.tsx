import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import agent from "../../../../app/api/agent";
import { Product } from "../../../../app/models/product";
import AddEntityModal from "../../../components/AddEntityModal";
import EntityList from "../../../components/EntityList";
import AdminMenu from "../../AdminMenu";
import AdminAddProduct from "./AdminAddProduct";
import AdminProductsList from "./AdminProductsList";

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productToAdd, setProductToAdd] = useState<Product>();
  const navigate = useNavigate();

  // Database interactions
  // Create Products list

  useEffect(() => {
    agent.Products.list().then((response) => {
      let products: Product[] = [];
      response.forEach((product: any) => {
        products.push(product);
      });
      setProducts(products);
    });
  }, []);

  // Add product to database

  function handleCreateProduct(product: Product) {
    agent.Products.create(product).then(() => {
      setProducts([...products, product]);
      navigate(`/admin/Products/${product.productId}`);
    });
  }

  // Other functions

  function handleProductToAdd(product: Product) {
    setProductToAdd(product);
  }

  function handleAdd() {
    handleCreateProduct(productToAdd!);
  }

  return (
    <>

      <AdminMenu activeItem="products" />

      <AddEntityModal
        actionName="Add Product"
        onAction={handleAdd}
        component={<AdminAddProduct handleAddEntity={handleProductToAdd} />}
      />

      <EntityList title="Products" component ={<AdminProductsList products={products}/>}/>

    </>
  );
}
