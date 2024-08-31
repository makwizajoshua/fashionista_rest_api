import express from "express";
import OrderController from "../controllers/orderController.mjs";

const orderRouter = express.Router();

// Place order for a product in the db
orderRouter.post("/orders", async (req, res, next) => await new OrderController().register(req, res, next));

// Get order for a particular user from the db
orderRouter.get("/order/:id", async (req, res, next) => await new OrderController().getOrder(req, res, next));
//Get orders from the db
orderRouter.get("/orders/:id", async (req, res, next ) => await new OrderController.getOrders(req, res, next));
// Delete an order from the db
orderRouter.delete("/orders/:id", async (req, res, next) => await new OrderController().removeOrder(req, res, next));
//Completes an order when payment is done
orderRouter.delete("order/complete", async (req, res, next) => await new OrderController().completeOrder(req, res, next));

export default orderRouter;