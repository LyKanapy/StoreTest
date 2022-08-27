import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import agent from "../../../app/api/agent";
import { Product } from "../../../app/models/product";


export default function ProductPage () {

    const [selectedProduct, setProduct] = useState<Product>();
    let {id} = useParams();

    useEffect(() => {
        agent.Products.details(id).then((response) => {
          let product = response;
          setProduct(product);
        });
      }, []);

    return (
            <Container>
                <h1>This is product HomePage</h1>
                <h1>{selectedProduct?.productId}</h1>
                <h1>{selectedProduct?.productName}</h1>
                <h1>{selectedProduct?.productPrice}</h1>
                <h1>{selectedProduct?.productQuantity}</h1>
                <h1>{selectedProduct?.productSku}</h1>
            </Container>
    );
}