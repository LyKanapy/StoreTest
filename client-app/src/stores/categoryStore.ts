import { makeAutoObservable, runInAction } from "mobx";
import agent from "../app/api/agent";
import { Category } from "../app/models/category";

export default class CategoryStore {
  categories: Category[] = [];
  listEdited: boolean = true;

  constructor() {
    makeAutoObservable(this);
  }

  // --- DATABASE INTERACTIONS ---
  // List (Get)

  loadListCategories = async () => {
    try {
      if (this.listEdited) {
        const categories = await agent.Categories.list();
        runInAction(() => {
          categories.forEach((category) => {
            this.categories.push(category);
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  unloadListCategories = () => {
    this.categories = [];
  };
}
