import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Button, Header, Icon, Segment, Table } from "semantic-ui-react";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import { Product } from "../../../../app/models/product";
import { useStore } from "../../../../stores/store";
import AddEntityModal from "../../../components/AddEntityModal";
import AdminAddOrderedProduct from "./AdminAddOrderedProduct";
import AdminOrderedProductItem from "./AdminOrderedProductItem";

export default observer(function AdminOrderedProductsList() {
  // MobX
  const { orderStore } = useStore();

  return (
    <>
      {/* THERE ARE NO ORDERED PRODUCTS */}
      {(orderStore.selectedOrder?.orderedProducts == null ||
        orderStore.selectedOrder?.orderedProducts.length == 0) && (
        <Segment placeholder>
          <Header icon>
            <Icon name="shopping basket" />
            There are no ordered products in this order, please add order by
            pressing a button.
          </Header>
          <Segment.Inline>
            <AddEntityModal
              actionName="Product"
              onAction={orderStore.addOrderedProduct}
              component={<AdminAddOrderedProduct />}
            />
          </Segment.Inline>
        </Segment>
      )}


      {/* THERE IS AT LEAST ONE ORDERED PRODUCT */}
      {(orderStore.selectedOrder?.orderedProducts == null ||
        orderStore.selectedOrder?.orderedProducts.length > 0) &&
        <>
        
      <AddEntityModal
        actionName="Product"
        onAction={orderStore.addOrderedProduct}
        component={<AdminAddOrderedProduct />}
      />

      <h1>Ordered Products</h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Sku</Table.HeaderCell>
            <Table.HeaderCell>Ordered qnt.</Table.HeaderCell>
            <Table.HeaderCell>Item Price, EUR</Table.HeaderCell>
            <Table.HeaderCell>Total Price, EUR</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {orderStore.selectedOrder?.orderedProducts?.map(
            (orderedProduct: OrderedProduct | undefined) => (
              <AdminOrderedProductItem
                key={orderedProduct?.productId}
                orderedProduct={orderedProduct}
              />
            )
          )}
        </Table.Body>
      </Table>
        </>

        }
    </>
  );
});
