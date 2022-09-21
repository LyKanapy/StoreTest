import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Product } from "../../../../app/models/product";
import { useStore } from "../../../../stores/store";
import AddEntityModal from "../../../components/AddEntityModal";
import EntityList from "../../../components/EntityList";
import AdminMenu from "../../AdminMenu";
import AdminAddProduct from "./AdminAddProduct";
import AdminProductsList from "./AdminProductsList";

export default observer(function AdminProducts() {
  // MobX
  const { productStore } = useStore();

  const [productToAdd, setProductToAdd] = useState<Product>();
  const navigate = useNavigate();

  // Database interactions
  // Create Products list

  useEffect(() => {
    productStore.loadListProducts();
    productStore.listEdited = false;
  }, []);

  // Other functions

  function handleProductToAdd(product: Product) {
    setProductToAdd(product);
  }

  function handleAdd() {
    productStore
      .createProduct(productToAdd!)
      .then(() => navigate(`/admin/Products/${productToAdd!.productId}`));
  }

  return (
    <>
      <AdminMenu activeItem="products" />
      <AddEntityModal
        actionName="Add Product"
        onAction={handleAdd}
        component={<AdminAddProduct handleAddEntity={handleProductToAdd} />}
      />
      <EntityList
        title="Products"
        component={<AdminProductsList products={productStore.products} />}
      />
    </>
  );
});
