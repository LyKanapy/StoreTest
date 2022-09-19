import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Table } from "semantic-ui-react";
import { forEachChild } from "typescript";
import agent from "../../../../app/api/agent";
import { Order, OrderToUpdate } from "../../../../app/models/order";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import {
  OrderedProductData,
  OrderedProductsActions,
} from "../../../../app/models/orderedProductsActions";
import { Product } from "../../../../app/models/product";
import DetailsTableRow from "../../../components/DetailsTableRow";
import DetailsTableRowCustomer from "../../../components/DetailsTableRowCustomer";
import AdminOrderedProductsList from "./AdminOrderedProductsList";

export default function AdminProductDetails() {
  const [selectedOrder, setOrder] = useState<Order | undefined>();
  const [orderedProducts, setOrderedProducts] = useState<Order | undefined>();
  const [productsData, setProductsData] = useState<OrderedProduct[]>([]);
  const [productToAdd, setProductToAdd] = useState<OrderedProduct>();
  const [customerToChange, setCustomerToChange] = useState<string[]>();

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

  // OrderedProducts functions
  // Create and sent OrderedProducts array to the backend client to add / update / remove relationships between Products add Orders tables in database.

  function handleEditOrderedProducts() {
    // Mapping function to map OrderedProduct to OrderedProductData

    function mapOrderedProductData(array: OrderedProductData[]) {
      let arrayToReturn: OrderedProductData[] = [];
      array.forEach((x) => {
        {
          let object = {
            productId: x.productId,
            quantity: x.quantity,
            unitPrice: x.unitPrice,
          } as OrderedProductData;
          arrayToReturn.push(object);
        }
      });
      return arrayToReturn;
    }

    let productsAction = {
      productsToRemove: [] as OrderedProductData[],
      productsToAdd: [] as OrderedProductData[],
      productsToUpdate: [] as OrderedProductData[],
    } as OrderedProductsActions;

    let arrOriginal: OrderedProductData[] = [];

    if (arrOriginal) arrOriginal = orderedProducts!.orderedProducts;

    let arrEdited = productsData;

    let arrToRemove = arrOriginal.filter(
      (o) => !arrEdited.some((e) => e.productId === o.productId)
    );

    let productsToRemove = mapOrderedProductData(arrToRemove);

    let arrToAdd = arrEdited.filter(
      (o) => !arrOriginal?.some((e) => e.productId === o.productId)
    );

    let productsToAdd = mapOrderedProductData(arrToAdd);

    let arrRemain = arrEdited.filter((o) =>
      arrOriginal?.some((e) => e.productId === o.productId)
    );

    let productsToUpdate = mapOrderedProductData(arrRemain);

    productsAction.productsToUpdate = productsToUpdate;
    productsAction.productsToAdd = productsToAdd;
    productsAction.productsToRemove = productsToRemove;

    // Total order price calculation method

    let totalPrice: number = 0;
    productsToAdd.forEach((product) => {
      totalPrice = totalPrice + product.unitPrice;
    });
    productsToUpdate.forEach((product) => {
      totalPrice = totalPrice + product.unitPrice;
    });

    agent.Orders.updateOrderedProducts(id!, productsAction);
    
    console.log("Add")
    console.log(arrToAdd)
    console.log("Edit")
    console.log(arrRemain)
    console.log("Remove")
    console.log(arrToRemove)
    console.log("Full array")
    console.log(productsAction)
    console.log("Total")
    console.log(totalPrice)

    return totalPrice;
  }

  // Creates product object to add to productData list, which is pushed to array in function below

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

  // Pushes object to array with orderedproducts

  function handleAdd() {
    let x = productsData;
    setProductsData([...x, productToAdd!]);
  }

  function handleRemoveProduct(id: string) {
    setProductsData(productsData!.filter((i) => i.productId !== id));
  }

  // Save parameter to change customer to which this order is set to

  function handleSetUpdateCustomer(id: string) {
    let ids: string[] = [];
    ids.push(selectedOrder!.orderId);
    ids.push(id);
    setCustomerToChange(ids);
  }

  // Change customer to which this order is set to

  function handleUpdateCustomer() {
    if (customerToChange === undefined) {
      return;
    }
    if (customerToChange[0] === customerToChange[1]) {
      return;
    }
    agent.Orders.updateCustomer(customerToChange);
  }

  // Change Order object values to display in browser view

  function handleUpdateOrderValues(object: any) {
    setOrder(object);
  }

  // Update Order info database

  function handleUpdateOrder(totalPrice: number) {
    if (selectedOrder) {
      let orderToUpdate = {
        orderId: selectedOrder.orderId,
        orderNumber: selectedOrder.orderNumber,
        orderStatus: selectedOrder.orderStatus,
        orderComment: selectedOrder.orderComment,
        orderTotal: totalPrice,
      } as OrderToUpdate;

      agent.Orders.update(orderToUpdate);
    }
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
            updateData={handleUpdateOrderValues}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderStatus}
            dataKey="orderStatus"
            dataName="Order Status"
            updateData={handleUpdateOrderValues}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderTotal}
            dataKey="orderTotal"
            dataName="Total"
            updateData={handleUpdateOrderValues}
          />
          <DetailsTableRow
            object={selectedOrder}
            data={selectedOrder?.orderDate}
            dataKey="orderDate"
            dataName="Order Date"
            updateData={handleUpdateOrderValues}
          />
          <DetailsTableRowCustomer
            order={selectedOrder!}
            updateData={handleUpdateOrderValues}
            updateCustomer={handleSetUpdateCustomer}
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
        onClick={() => {
          handleUpdateCustomer();
          let totalPrice=handleEditOrderedProducts();
          handleUpdateOrder(totalPrice);
          window.location.reload();
        }}
      >
        Save Changes
      </Button>
      <Button onClick={() => console.log(productsData)}></Button>
    </>
  );
}
