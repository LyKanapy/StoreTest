import { createContext, useContext } from "react";
import CategoryStore from "./categoryStore";
import CustomerStore from "./customerStore";
import OrderStore from "./orderStore";
import ProductStore from "./productStore";

interface Store {
  productStore: ProductStore;
  orderStore: OrderStore
  categoryStore: CategoryStore
  customerStore: CustomerStore
}

export const store: Store = {
  productStore: new ProductStore(),
  orderStore: new OrderStore(),
  categoryStore: new CategoryStore(),
  customerStore: new CustomerStore()
};

export const StoreContext = createContext(store);

export function useStore() {
  return useContext(StoreContext);
}
