import { makeAutoObservable, runInAction } from "mobx";
import agent from "../app/api/agent";
import { Order, OrderToUpdate } from "../app/models/order";
import { OrderedProduct } from "../app/models/orderedProduct";
import {
  OrderedProductData,
  OrderedProductsActions,
} from "../app/models/orderedProductsActions";
import { Product } from "../app/models/product";

export default class OrderStore {
  orders: Order[] = [];
  orderedProducts: OrderedProduct[] | undefined = [];
  orderedProductsOriginal: OrderedProduct[] | undefined = [];
  orderedProductToAdd: OrderedProduct | undefined;
  changeCustomerTo: string = ""
  totalPrice: number = 0;
  selectedOrder: Order | null = null;
  orderToAdd: Order | null = null;
  // Product list has been edited:
  listEdited: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  // --- DATABASE INTERACTIONS ---
  // List (Get)

  loadListOrders = async () => {
    try {
      if (this.listEdited) {
        this.orders = [];
        const orders = await agent.Orders.list();
        runInAction(() => {
          orders.forEach((order) => {
            this.orders.push(order);
          });
        });
        this.listEdited = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Details (Get)

  loadOrder = async (id: string) => {
    try {
      const order = await agent.Orders.details(id);
      runInAction(() => {
        this.selectedOrder = order;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create (Post)

  createOrder = async (order: Order) => {
    try {
      await agent.Orders.create(order);
      runInAction(() => {
        this.listEdited = true;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Edit (Put)
  // Edit order info

  editOrder = async () => {
    try {
      if (this.selectedOrder) {
        let orderToUpdate = {
          orderId: this.selectedOrder.orderId,
          orderNumber: this.selectedOrder.orderNumber,
          orderStatus: this.selectedOrder.orderStatus,
          orderComment: this.selectedOrder.orderComment,
          orderTotal: this.totalPrice,
        } as OrderToUpdate;
  
        agent.Orders.update(orderToUpdate);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Edit ordered products info

  editOrderedProducts = () => {
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

    // 3 arrays with actions to send to API. Remove, add, edit many to many relationships between orders and products

    let productsAction = {
      productsToRemove: [] as OrderedProductData[],
      productsToAdd: [] as OrderedProductData[],
      productsToUpdate: [] as OrderedProductData[],
    } as OrderedProductsActions;

    let arrOriginal: OrderedProductData[] = [];
    if (arrOriginal) arrOriginal = this.orderedProductsOriginal!;
    console.log(arrOriginal)
    console.log(this.orderedProductsOriginal)

    let arrEdited = this.selectedOrder!.orderedProducts;

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

    
    productsToAdd.forEach((product) => {
      this.totalPrice = this.totalPrice + product.unitPrice;
    });
    productsToUpdate.forEach((product) => {
      this.totalPrice = this.totalPrice + product.unitPrice;
    });

    agent.Orders.updateOrderedProducts(this.selectedOrder!.orderId, productsAction);

    console.log("Add");
    console.log(arrToAdd);
    console.log("Edit");
    console.log(arrRemain);
    console.log("Remove");
    console.log(arrToRemove);
    console.log("Full array");
    console.log(productsAction);
    console.log("Total");
    console.log(this.totalPrice);

  };

  // Change order customer

  updateOrderCustomer = async () => {
    try {
      await agent.Orders.updateCustomer([this.selectedOrder!.orderId, this.changeCustomerTo]);
    } catch (error) {
      
    }
  }

  idChangeCustomerTo = (id: string) => {
    this.changeCustomerTo = id
  }

  // Remove (Delete)

  deleteOrder = async (id: string) => {
    try {
      agent.Orders.delete(id);
      this.listEdited = true;
    } catch (error) {
      console.log(error);
    }
  };






  //  --- Ordered Products ---

  setOrderedProducts = () => {
    this.orderedProducts = this.selectedOrder?.orderedProducts;
  };

  setOriginalOrderedProducts = () => {
    this.orderedProductsOriginal = this.selectedOrder?.orderedProducts;
  };

  removeOrderedProduct = (id: string) => {
    this.selectedOrder!.orderedProducts =
      this.selectedOrder!.orderedProducts.filter((i) => i.productId !== id);
  };

  // Creates ordered product object to use later when addOrderedProduct function will be called
  setOrderedProductToAdd = (product: Product) => {
    let object = {
      productId: product.productId,
      productName: product.productName,
      productSku: product.productSku,
      productPrice: product.productPrice,
      quantity: 1,
      unitPrice: product.productPrice,
    } as OrderedProduct;
    this.orderedProductToAdd = object;
  };

  // Add ordered product to ordered products list
  addOrderedProduct = () => {
    let x: OrderedProduct[] = this.selectedOrder!.orderedProducts;
    if (this.orderedProductToAdd) {
      this.selectedOrder!.orderedProducts = [...x, this.orderedProductToAdd];
    }
  };

  // Set selected order in client view

  setOrderObject = (object: Order) => {
    this.selectedOrder = object;
  };
}
