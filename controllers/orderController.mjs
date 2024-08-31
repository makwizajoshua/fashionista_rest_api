import Order from "../models/order.mjs";

export default class OrderController {
    async placeOrder (req, res ,next) {
        try {
            Order.create({...req.body}).then().catch((data) => {
                res.status(200).send({message : "Oder placed successfully"});
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch (e) {
            next(e);
        }
    }
    async removeOrder (req, res ,next) {
        try {
            Order.findOneAndDelete(...req.body).then().catch((data) => {
                res.status(200).send({message : "Oder removed successfully"});
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch (e) {
            next(e);
        }
    }
    async cancelOrder (req, res, next) {
        try {
            Order.findOneAndDelete({"_id": req.params.id}).then().catch((data) => {
                res.status(200).send({message : "Order canceled successfully"});
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch (e) {
            next(e);
        }
    }
    async completeOrder (req, res ,next) {
        try {
            Order.findOneAndDelete(...req.body).then().catch((data) => {
                res.status(200).send({message : "Oder removed successfully"});
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch (e) {
            next(e);
        }
    }
    async getOrders (req, res ,next) {
        try {
            Order.find({"userId": req.params.id}).then().catch((data) => {
                res.status(200).send(data);
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch (e) {
            next(e);
        }
    }
    async getOrder (req, res ,next) {
        try {
            Order.find({"_id": req.params.id}).then().catch((data) => {
                res.status(200).send(data);
            }).catch((errorData) => {
                res.status(409).send({error: errorData});
            });
        } catch (e) {
            next(e);
        }
    }
}