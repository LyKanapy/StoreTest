import { makeAutoObservable, runInAction } from "mobx";
import agent from "../app/api/agent";
import { Customer } from "../app/models/customer";

export default class CustomerStore {
  customers: Customer[] = [];
  selectedCustoemr: Customer | null = null;
  listEdited: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  // --- DATABASE INTERACTIONS ---
  // List (Get)

  loadListCustomers = async () => {
    try {
      if (this.listEdited) {
        this.customers = [];
        const customers = await agent.Customers.list();
        // Galbut reiks veliau
        runInAction(() => {
          customers.forEach((customer) => {
            this.customers.push(customer);
          });
        });
        this.listEdited = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  unloadListCustomers = () => {
    this.customers = []
  }

  // Details (Get)

  loadCustomer = async (id: string) => {
    try {
      const customer = await agent.Customers.details(id);
      runInAction(() => {
        this.selectedCustoemr = customer;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create (Post)

  createCustomer = async (customer: Customer) => {
    try {
      await agent.Customers.create(customer);
      runInAction(() => {
        this.listEdited = true;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Edit (Put)

  editCustomer = async (customer: Customer) => {
    try {
      agent.Customers.update(customer);
      this.listEdited = true;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Remove (Delete)

  deleteProduct = async (id: string) => {
    try {
      agent.Products.delete(id);
      this.listEdited = true;
    } catch (error) {
      console.log(error);
    }
  };
}
