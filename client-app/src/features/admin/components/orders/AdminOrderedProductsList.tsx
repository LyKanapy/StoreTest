import { observer } from "mobx-react-lite";
import { Table } from "semantic-ui-react";
import { OrderedProduct } from "../../../../app/models/orderedProduct";
import { Product } from "../../../../app/models/product";
import { useStore } from "../../../../stores/store";
import AddEntityModal from "../../../components/AddEntityModal";
import AdminAddOrderedProduct from "./AdminAddOrderedProduct";
import AdminOrderedProductItem from "./AdminOrderedProductItem";

export default observer ( function AdminOrderedProductsList() {
  
    // MobX
    const { orderStore } = useStore();

  return (
    <>
      <AddEntityModal
        actionName="Add Product"
        onAction={orderStore.addOrderedProduct}
        component={<AdminAddOrderedProduct/>}
      />

      <h1>OrderedProducts </h1>
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>
              Product

            </Table.HeaderCell>
            <Table.HeaderCell>Sku</Table.HeaderCell>
            <Table.HeaderCell>Ordered qnt.</Table.HeaderCell>
            <Table.HeaderCell>Item Price, EUR</Table.HeaderCell>
            <Table.HeaderCell>Total Price, EUR</Table.HeaderCell>
            <Table.HeaderCell></Table.HeaderCell>
          </Table.Row>
        </Table.Header>


        <Table.Body>
          {orderStore.selectedOrder?.orderedProducts?.map((orderedProduct: OrderedProduct | undefined) => (
            <AdminOrderedProductItem
              key={orderedProduct?.productId}
              orderedProduct={orderedProduct}
            />
          ))}
        </Table.Body>
      </Table>
    </>
  );
})
