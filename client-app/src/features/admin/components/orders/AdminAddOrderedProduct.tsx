import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Dropdown } from "semantic-ui-react";
import agent from "../../../../app/api/agent";
import { Product } from "../../../../app/models/product";

interface Props {
  handleAddEntity(object: any): void;
}

export default function ({ handleAddEntity }: Props) {
  const [productOptions, setProductOptions] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Get Products list to add
    agent.Products.list().then((response) => {
      let products: Product[] = [];
      response.forEach((product: Product) => {
        products.push(product);
      });
      let objects: any = [];
      products.map((product) => {
        let object = {
          key: product.productId,
          text: product.productName,
          value: product.productId,
        };
        objects.push(object);
      });
      setProductOptions(objects);
      setProducts(products);
    });
},[]);

function handleSetProduct () {
    console.log(products)
    console.log(productId)
    // console.log(products.find(x=> x.productId === productId))
    handleAddEntity(products.find(x=> x.productId === productId))
}

function handleInputChange(
    event: React.SyntheticEvent<HTMLElement>,
    data: any
    ) {
        setProductId(data.value);
        console.log(productId)

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
        <Button
        onClick={handleSetProduct}
        >
        </Button>
        <h5>{productId}</h5>

    </>
  );
}
