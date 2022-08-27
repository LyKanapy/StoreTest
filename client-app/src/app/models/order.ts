import { Customer } from "./customer";
import { OrderedProduct } from "./orderedProduct";

export interface Order {
    orderId: string,
    orderNumber: string,
    orderDate: Date,
    orderTotal: number,
    orderStatus: string,
    orderComment?: string,
    customer: Customer,
    orderedProducts: OrderedProduct[]
  }
  

  