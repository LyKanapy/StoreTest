import { makeAutoObservable, runInAction } from "mobx";
import agent from "../app/api/agent";
import { Product } from "../app/models/product";

export default class ProductStore {
  products: Product[] = [];
  categoryIds: string[] = [];
  changeCategoryTo: string = "";
  selectedProduct: Product | null = null;
  productToAdd: Product | null = null;
  // Product list has been edited:
  listEdited: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  // --- DATABASE INTERACTIONS ---
  // List (Get)

  loadListProducts = async () => {
    try {
      if (this.listEdited) {
        this.products = [];
        const products = await agent.Products.list();
        // Galbut reiks veliau
        runInAction(() => {
          products.forEach((product) => {
            this.products.push(product);
          });
        });
        this.listEdited = false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Details (Get)

  loadProduct = async (id: string) => {
    try {
      const product = await agent.Products.details(id);
      runInAction(() => {
        this.selectedProduct = product;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Create (Post)

  createProduct = async (product: Product) => {
    try {
      await agent.Products.create(product);
      runInAction(() => {
        this.listEdited = true;
      });
    } catch (error) {
      console.log(error);
    }
  };

  // Edit (Put)

  editProduct = async (product: Product) => {
    try {
      agent.Products.update(product);
      this.listEdited = true;
    } catch (error) {
      console.log(error);
    }
  };
  
  // Update Category of product

  updateProductCategory = async () => {
    try {
      await agent.Products.updateCategory([this.selectedProduct!.productId, this.changeCategoryTo]);
    } catch (error) {
      console.log(error);
    }
  }

  // Remove (Delete)

  deleteProduct = async (id: string) => {
    try {
      agent.Products.delete(id);
      this.listEdited = true;
    } catch (error) {
      console.log(error);
    }
  };

  updateProductObject = (object: Product) => {
    this.selectedProduct = object;
  };

  idChangeCategoryTo = (id: string) => {
    this.changeCategoryTo = id;
  }

}
