import mongoose from "mongoose";

const commentSchema = mongoose.Schema({
    comment: { type: String, required: true },
    pin: { type: mongoose.Schema.Types.ObjectId, ref: "Pin" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    likes: { type: [String], default: [] },
    createdAlt: { type: Date, default: Date.now },
    updatedAlt: { type: Date, default: Date.now },
});

export default mongoose.model("Comment", commentSchema);
