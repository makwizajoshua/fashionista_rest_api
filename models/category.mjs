import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CatergorySchema = new Schema({
    catergoryName: {
        type: String,
        required: [true, "Category name field not provided"]
    },
    categroyImageUrl: {
        type: String,
        required: [true, "Category ImageUrl field not provided"]
    }
});

const Category = mongoose.model("category", CatergorySchema);
export default Category;