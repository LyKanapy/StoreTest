import React from "react";
import { Link } from "react-router-dom";
import { Button, ButtonGroup, Card, Input, Segment } from "semantic-ui-react";
import { Product } from "../../app/models/product";

    interface Props {
        product: Product;
    }


export default function ProductGridItem({product}:Props) {

    return (
        <Card
            as={Link} to={`/Products/${product.productId}`}
            style={{ margin: 10 }}>
                <Card.Content textAlign="left">
                    <Card.Header>{product.productName}</Card.Header>
                    <Card.Description>
                    This is product description.
                    </Card.Description>
                </Card.Content >
                <Card.Content textAlign="left">
                    In stock: {product.productQuantity}
                </Card.Content>
                <Card.Content textAlign="right" style={{color: "blue"}}>
                    {product.productPrice}
                </Card.Content>
      </Card>
    )



}