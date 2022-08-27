import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Grid, Icon } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { Category } from "../../app/models/category";
import ProductGridItem from "./ProductGriditem";

export default function ProductPage() {
  const [selectedCategory, setCategories] = useState<Category>();

  let { id } = useParams();

  useEffect(() => {
    agent.Categories.details(id).then((response) => {
      let category = response;
      setCategories(category);
    });
  }, [id]);

  return (
    <>
        <h1>{selectedCategory?.categoryName}</h1>  
        <Grid>
        <Grid.Row centered>
            {selectedCategory?.products.map((product: any) => (
            <ProductGridItem key={product.productId} product={product} />
            ))}
        </Grid.Row>
        </Grid>
    </>
  );
}
