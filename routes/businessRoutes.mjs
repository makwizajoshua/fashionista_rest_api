import express from "express";
import BusinessController from "../controllers/businessController.mjs";

const businessRouter = express.Router();

// Checks whether a user has a business present in the db
businessRouter.get("/business/check/:id", async (req, res, next) => await new BusinessController().checkBusinessExist(req, res, next));
// Creates a business on the db
businessRouter.post("/business/create", async (req, res, next) => await new BusinessController().createBusiness(req, res, next));

// Get all businesses from the db
businessRouter.get("/business", async (req, res, next) => await new BusinessController().getBusinesses(req, res, next));
// Get a specific business from the db
businessRouter.get("/business/:id", async (req, res, next) => await new BusinessController().getBusiness(req, res, next));

// Update user data in the db
businessRouter.put("/business/:id", async (req, res, next) => await new BusinessController().updateBusiness(req, res, next));

// Delete a business from the db
businessRouter.delete("/business/:id", async (req, res, next) => await new BusinessController().deleteBusiness(req, res, next));

export default businessRouter;