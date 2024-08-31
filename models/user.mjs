import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, "Username field is not provided"],
    },//Username property in the db
    email: {
        type: String,
        required: [true, "Email field is not provided"],
        unique: true
    },//Email property in the db
    password: {
        type: String,
        required: [true, "Password field is not provided"],
    },//Password property in the db
    gender: {
        type: Number,
        default: 2,
    },//Gender property in the db
});

const User = mongoose.model("user", UserSchema);
export default User;
