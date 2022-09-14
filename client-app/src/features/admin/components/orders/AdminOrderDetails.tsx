import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import agent from "../../../../app/api/agent";
import { Order } from "../../../../app/models/order";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import { OrderedProductData, OrderedProductsActions } from "../../../../app/models/orderedProductsActions";
import { Product } from "../../../../app/models/product";
import AddEntityModal from "../../../components/AddEntityModal";
import DetailsTableRow from "../../../components/DetailsTableRow";
import AdminOrderedProductsList from "./AdminOrderedProductsList";

export default function AdminProductDetails() {
  const [selectedOrder, setOrder] = useState<Order | undefined>();
  const [orderedProducts, setOrderedProducts] = useState<Order | undefined>();
  const [productsData, setProductsData] = useState<
    OrderedProduct[]
  >([]);
  const [productToAdd, setProductToAdd] = useState<OrderedProduct>();

  let { id } = useParams();

  // Needs optimizing attention
  // UseEffect has weo agent calls, 
  // first - get order derails, separated from other functions and events to keep original ordered products list
  // second - get order details,  somehow ordered product list gets overwriten after product add/edit/remove actions 

  useEffect(() => {
    agent.Orders.details(id).then((response) => {
      let product = response;
      setOrderedProducts(product);
    });
    agent.Orders.details(id).then((response) => {
      let order = response;
      setOrder(order);
      setProductsData(order.orderedProducts);
    });
  }, [id]);

  function handleProductToAdd(product: Product) {
    let object = {
      productId: product.productId,
      productName: product.productName,
      productSku: product.productSku,
      productPrice: product.productPrice,
      quantity: 1,
      unitPrice: product.productPrice,
    } as OrderedProduct;
    setProductToAdd(object);
  }

  function handleEditProduct(order: Order) {
    // agent.Orders.update(order);
   let productsAction = {
      productsToRemove: [] as OrderedProductData[],
      productsToAdd: [] as OrderedProductData[],
      ProductsToUpdate: [] as OrderedProductData[]
    } as OrderedProductsActions

    let arrOriginal = orderedProducts?.orderedProducts;
    let arrEdited = productsData;

    let arrToRemove = arrOriginal?.filter(o => !arrEdited.some(e => e.productId === o.productId)); 
    let arrToAdd = arrEdited.filter(o => !arrOriginal?.some(e => e.productId === o.productId)); 
    let arrRemain = arrEdited.filter(o => arrOriginal?.some(e => e.productId === o.productId)); 
    
    let arrToEdit 


    console.log("To Remove")
    console.log(arrToRemove)
    console.log("To Add")
    console.log(arrToAdd)
    console.log("To Edit")
    console.log(arrRemain)
    console.log("Original")
    console.log(arrOriginal)
  }

  function handleUpdateOrder(object: any) {
    setOrder(object);
  }

  function handleAdd() {
    let x = productsData;
    setProductsData([...x, productToAdd!])
  }

  function handleRemoveProduct(id: string) {
    setProductsData(productsData!.filter((i) => i.productId !== id));
  }

  return (
    <>
      <Table celled key={selectedOrder?.orderId}>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="4">
              {selectedOrder?.orderNumber}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderNumber}
            dataKey="orderNumber"
            dataName="Order Number"
            updateData={handleUpdateOrder}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderStatus}
            dataKey="orderStatus"
            dataName="Order Status"
            updateData={handleUpdateOrder}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderTotal}
            dataKey="orderTotal"
            dataName="Total"
            updateData={handleUpdateOrder}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderDate}
            dataKey="orderDate"
            dataName="Order Date"
            updateData={handleUpdateOrder}
          />
        </Table.Body>
      </Table>

      <AdminOrderedProductsList
        orderedProducts={selectedOrder?.orderedProducts}
        handleAdd={handleAdd}
        handleRemoveProduct={handleRemoveProduct}
        handleProductToAdd={handleProductToAdd}
        productsData={productsData}
      />
      <Button
        floated="right"
        positive
        onClick={() => handleEditProduct(selectedOrder!)}
      >
        Save Changes
      </Button>
      <Button onClick={() => console.log(productsData)}></Button>
    </>
  );
}
