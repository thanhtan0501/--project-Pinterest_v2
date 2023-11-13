import mongoose from "mongoose";

const pinSchema = mongoose.Schema({
    title: String,
    about: String,
    link: String,
    userId: String,
    tags: [String],
    image: String,
    saves: { type: [String], default: [] },
    users: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
    createdAlt: { type: Date, default: Date.now },
    updatedAlt: { type: Date, default: Date.now },
});

export default mongoose.model("Pin", pinSchema);
