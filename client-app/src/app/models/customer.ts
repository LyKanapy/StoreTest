import { Order } from "./order";

export interface Customer {
    customerId: string,
    customerName: string,
    customerSurname: string,
    customerPhone: string,
    customerEmail: string,
    customerAdressCountry: string,
    customerAdressCity: string,
    customerAdressStreet: string,
    customerAdressHouse: string,
    orders?: Order[]
  }


  