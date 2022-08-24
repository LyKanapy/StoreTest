import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import agent from "../app/api/agent";
import { Product } from "../app/models/product";
import ProductGridItem from "./frontStore/ProductGriditem";

export default function HomePage() {

    interface Props {
        product: Product;
    }
    
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        agent.Products.list().then((response) => {
          let products: Product[] = [];
          response.forEach((product: any) => {
            products.push(product);
          });
          setProducts(products);
        });
      }, []);

    return (
        <Grid>
        <Grid.Row centered>
          {products.map((product: any) => (
            <ProductGridItem key={product.productId} product={product} />
          ))}
        </Grid.Row>
      </Grid>
    )
}