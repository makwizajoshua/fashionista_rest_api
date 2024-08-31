import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    businessId: {
        type: String,
        required: [true, "Busiess ID was not provided"]
    },
    title: {
        type: String,
        required: [true, "Title field is not provided"],
    },
    rating: {
        type: Schema.Types.Decimal128,
        default: 0,
    },
    imageUrl: [{
        type: String,
        required: [true, 'Image URL is not provided'],
    }],
    sizes: [{
        type: String,
    }],
    colors: [{
        type: String,
    }],
    preferredGender: {
        type: Number,
        default: 2
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    category: {
        type: String,
        required: [true, 'Category field is not provided'],
    },
    brand: {
        type: String,
        required: [true, 'Brand field is not provided'],
    },
    price: {
        type: Number,
        default: 0,
    }
});

const Product = mongoose.model("product", ProductSchema);
export default Product;