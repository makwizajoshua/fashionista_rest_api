import express from "express";
import CategoryController from "../controllers/categoryController.mjs";

const categoryRouter = express.Router();

//Creates a category in the db
categoryRouter.post("/category", async (req, res, next) => await new CategoryController().addCategory(req, res, next));

//Gets all the categories in the db
categoryRouter.get("/categories", async (req, res, next) => await new CategoryController().getCategories(req, res, next));
//Gets a category from the db
categoryRouter.get("/category/:id", async (req, res, next) => await new CategoryController().getCategory(req, res, next));

//Updates a category in the db
categoryRouter.put("/category/:id", async (req, res, next) => await new CategoryController().updateCategory(req, res, next));

//Deletes a category in the db
categoryRouter.delete("/category/:id", async (req, res, next) => await new CategoryController().deleteCategory(req, res, next));

export default categoryRouter;