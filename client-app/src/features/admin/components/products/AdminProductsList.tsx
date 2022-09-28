import { observer } from "mobx-react-lite";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Table } from "semantic-ui-react";
import { Product } from "../../../../app/models/product";

interface Props {
    products: Product[]
}

export default observer (function AdminProductsList({products}: Props) {

    const navigate = useNavigate();


    return (
        <>
            <Table.Header>
            <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>SKU</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
            </Table.Header>

            <Table.Body>
            {products.map((product: any) => (
                <Table.Row
                key={product.productId}
                onClick={() => navigate(`/admin/Products/${product.productId}`)}
                style={{ cursor: "pointer" }}
                >
                <Table.Cell>{product.productName}</Table.Cell>
                <Table.Cell>{product.productSku}</Table.Cell>
                <Table.Cell>{product.productQuantity}</Table.Cell>
                <Table.Cell>{product.productPrice}</Table.Cell>
                </Table.Row>
            ))}
            </Table.Body>
        </>
    )
})