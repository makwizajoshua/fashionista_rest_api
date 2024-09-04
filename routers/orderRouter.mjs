import express from "express";
import OrderController from "../controllers/orderController.mjs";

const orderRouter = express.Router();
const orderController = new OrderController();

orderRouter.post('order', orderController.createOrder);
orderRouter.post('order/complete', orderController.completeOrder);

orderRouter.get('orders', orderController.getOrders);
orderRouter.get('order/:id', orderController.getOrder);

orderRouter.patch('order/:id', orderController.updateOrder);

orderRouter.delete('order/:id', orderController.deleteOrder);

export default orderRouter;