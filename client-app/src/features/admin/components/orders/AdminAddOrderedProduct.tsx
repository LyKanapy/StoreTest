import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import { Product } from "../../../../app/models/product";
import { useStore } from "../../../../stores/store";

export default observer ( function () {
  const [productOptions, setProductOptions] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  const { productStore, orderStore } = useStore();

  // Get Products list to add
  useEffect(() => {
    productStore.loadListProducts().then(() => {
      let objects: any = [];
      productStore.products.forEach((product) => {
        let object = {
          key: product.productId,
          text: product.productName,
          value: product.productId,
        };
        objects.push(object);
      });
      setProducts(productStore.products);
      setProductOptions(objects);
    });
  }, []);


  // Create object to add to ordered products list later

  useEffect(() => {
    let object = products.find((x) => x.productId === productId);
    if (object) {
      orderStore.setOrderedProductToAdd(object);
    }
    console.log(object);
  }, [productId]);

  function handleSetProduct() {
    console.log(products);
    console.log(productId);
    console.log(products.find((x) => x.productId === productId));
    // handleAddEntity(
  }

  function handleInputChange(
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) {
    setProductId(data.value);
  }

  return (
    <>
      <Dropdown
        placeholder="Add Product"
        search
        selection
        options={productOptions}
        onChange={handleInputChange}
      />
      <Button onClick={handleSetProduct}></Button>
      <h5>{productId}</h5>
    </>
  );
})
