import { Router } from "express";
import CategoriesController from "../controllers/categories";

const categoriesRouter = Router();

const categoriesController = new CategoriesController();

categoriesRouter.get("/categories", categoriesController.getAllCategories);
categoriesRouter.get("/categories/:id", categoriesController.getCategoryDetail);
categoriesRouter.post("/categories", categoriesController.createCategory);
categoriesRouter.put("/categories/:id", categoriesController.updateCategory);
categoriesRouter.delete("/categories/:id", categoriesController.deleteCategory);

export default categoriesRouter;
