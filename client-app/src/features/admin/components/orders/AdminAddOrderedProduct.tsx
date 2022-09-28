import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Divider, Dropdown, Input } from "semantic-ui-react";
import { Product } from "../../../../app/models/product";
import { useStore } from "../../../../stores/store";

export default observer(function () {
  const [productOptions, setProductOptions] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [inStock, setInStock] = useState<number>();
  const [inStockCalc, setInStockCalc] = useState<number>();
  const { productStore, orderStore } = useStore();

  // Get Products list to add
  useEffect(() => {
    productStore.loadListProducts().then(() => {
      // create array for dropdown data
      let objects: any = [];
      productStore.products.forEach((product) => {
        let object = {
          key: product.productId,
          text: product.productName,
          value: product.productId,
        };
        objects.push(object);
      });
      // filter dropdown array for already added products to ordered product list
      let objectsFiltered = objects.filter(
        (o: any) =>
          !orderStore.selectedOrder?.orderedProducts.some(
            (e) => e.productId === o.value
          )
      );
      setProducts(productStore.products);
      setProductOptions(objectsFiltered);
    });
  }, []);

  // Create object to add to ordered products list later

  useEffect(() => {
    let object = products.find((x) => x.productId === productId);
    if (object) {
      orderStore.setOrderedProductToAdd(object);
      setInStock(object.productQuantity);
    }
    console.log(object);
  }, [productId]);

  function handleInStockChange(data: any) {
    let x: number = inStock! - data;
    return x;
  }

  function handleInputChange(
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) {
    setProductId(data.value);
  }
  function handleInputChangeStock(
    event: React.SyntheticEvent<HTMLElement>,
    data: any
  ) {
    setInStockCalc(handleInStockChange(data.value));
  }

  return (
    <>
      <Dropdown
        placeholder="Add Product"
        search
        selection
        fluid
        options={productOptions}
        onChange={handleInputChange}
      />
      <Divider />
      <Input
        placeholder="Select Quantity"
        onChange={handleInputChangeStock}
      ></Input>
      <p>
        {inStock != undefined
          ? inStockCalc
            ? `In Stock: ${inStockCalc}`
            : `In Stock: ${inStock}`
          : ""}
      </p>

      {/* Tests
      <Button onClick={handleSetProduct}></Button>
      <h5>{productId}</h5> */}
    </>
  );
});
