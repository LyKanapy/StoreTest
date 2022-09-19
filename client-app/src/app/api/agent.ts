import axios, { AxiosResponse } from "axios";
import { Category } from "../models/category";
import { Customer } from "../models/customer";
import { Order, OrderToUpdate } from "../models/order";
import { OrderedProductsActions } from "../models/orderedProductsActions";
import { Product } from "../models/product";
import { Supplier } from "../models/supplier";

axios.defaults.baseURL = "https://localhost:5000/api";

const responseBody = <T>(response : AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    putId: <T>(url: string) => axios.put<T>(url).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody)
};

const Products = {
    list: () => request.get<Product[]>("/Products"),
    details: (id?: string) => request.get<Product>(`/Products/${id}`),
    create: (product: Product) => request.post<void>(`/Products/`,product),
    update: (product: Product) => request.put<void>(`/Products/${product.productId}`,product),
    updateCategory: (ids: string[]) => request.putId<void>(`/Products/${ids[0]}/${ids[1]}`),
    delete: (id: string) => request.del<void>(`/Products/${id}`)
};

const Categories = {
    list: () => request.get<Category[]>("/Categories"),
    details: (id?: string) => request.get<Category>(`/Categories/${id}`),
    create: (category: Category) => request.post<void>(`/Categories/`, category),
    update: (category: Category) => request.put<void>(`/Categories/${category.categoryId}`,category),
    delete: (id: string) => request.del<void>(`/Categories/${id}`)
};

const Customers = {
    list: () => request.get<Customer[]>("/Customers"),
    details: (id?: string) => request.get<Customer>(`/Customers/${id}`),
    create: (customer: Customer) => request.post<void>(`/Customers/`, customer),
    update: (customer: Customer) => request.put<void>(`/Customers/${customer.customerId}`,customer),
    delete: (id: string) => request.del<void>(`/Customers/${id}`)
};

const Orders = {
    list: () => request.get<Order[]>("/Orders"),
    details: (id?: string) => request.get<Order>(`/Orders/${id}`),
    create: (order: Order) => request.post<void>(`/Orders/`, order),
    update: (order: OrderToUpdate) => request.put<void>(`/Orders/${order.orderId}`,order),
    updateCustomer: (ids: string[]) => request.putId<void>(`/Orders/${ids[0]}/${ids[1]}`),
    updateOrderedProducts: (id: string, actions: OrderedProductsActions) => request.put<void>(`/Orders/${id}/update`,actions),
    delete: (id: string) => request.del<void>(`/Orders/${id}`)
};

const Suppliers = {
    list: () => request.get<Supplier[]>("/Suppliers"),
    details: (id?: string) => request.get<Supplier>(`/Suppliers/${id}`),
    create: (supplier: Supplier) => request.post<void>(`/Suppliers/`, supplier),
    update: (supplier: Supplier) => request.put<void>(`/Suppliers/${supplier.supplierId}`,supplier),
    delete: (id: string) => request.del<void>(`/Suppliers/${id}`)
};

const agent = {
    Products,
    Categories,
    Customers,
    Orders,
    Suppliers
}

export default agent;