import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    fullName: { type: String, require: true },
    userName: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    follower: { type: [String], default: [] },
    followed: { type: [String], default: [] },
    id: String,
    image: String,
    backgroundImage: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
