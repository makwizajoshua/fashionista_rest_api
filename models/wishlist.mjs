import mongoose from "mongoose";
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID field is not provided"],
    },
    productId: {
        type: String,
        required: [true, "Product ID field is not provided"],
    },
    productName: {
        type: String,
        required: [true, "Product Name field is not provided"],
    },
    productImageUrl: {
        type: String,
        required: [true, "Product ImageUrl field is not provided"],
    },
    productSize: {
        type: String,
        required: [true, "Product Size field is not provided"],
    },
    productColor: {
        type: String,
        required: [true, "Product Color field is not provided"],
    }
});


const Wishlist = mongoose.model("wishlist", WishlistSchema);
export default Wishlist;