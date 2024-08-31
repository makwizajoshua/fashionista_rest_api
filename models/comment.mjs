import mongoose from "mongoose";
const Schema = mongoose.Schema;

let Comment;

const CommentSchema = new Schema({
    userId: {
        type: String,
        required: [true, "User ID field is not provided"],
    },
    productId: {
        type: String,
        required: [true, "Product ID field is not provided"],
    },
    commentContent: {
        type: String,
        required: [true, "Comment Content field is not provided"],
    },
});


Comment = mongoose.model("comment", CommentSchema);
export default Comment;