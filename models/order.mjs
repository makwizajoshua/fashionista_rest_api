import mongoose from "mongoose";

const Schema = mongoose.Schema;
const orderSchema = Schema({
    productId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    completeId: {
        type: String,
        required: true
    },
    productColor: {
        type: String,
        required: true
    },
    productSize: {
        type: String,
        required: true
    },
});

const OrderModel = mongoose.model('orders', orderSchema);
export default OrderModel;
