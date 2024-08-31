import mongoose from "mongoose";
const Schema = mongoose.Schema;

const BusinessSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID field was not provided"],
    },
    businessName: {
        type: String,
        required: [true, "Business name field was not provided"]
    },
    businessDescription: {
        type: String,
        required: [true, "Business description field was not provided"]
    },
    businessLocation: {
        type: Number,
        required: [true, "Business location field was not provided"]
    },
});

const Business = mongoose.model("businesses", BusinessSchema);
export default Business;