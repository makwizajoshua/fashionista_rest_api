import mongoose from 'mongoose';
const Schema = mongoose.Schema;

let Rating;

const RatingSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID field is not provided"],
    },
    productId: {
        type: String,
        required: [true, "Product ID field is not provided"],
    },
    productRating: {
        type: Schema.Types.Decimal128,
        required: [true, "Product Rating field is not provided"],
    }
});


Rating = mongoose.model("rating", RatingSchema);
export default Rating;