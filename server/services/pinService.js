import mongoose from "mongoose";

import Pin from "../models/pin.js";
import User from "../models/user.js";
import Comment from "../models/comments.js";
import { populate } from "dotenv";

export const fetchAllPinService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            // const pinsData = await Pin.find();
            const pinsData = await Pin.find()
                .populate("users", { password: 0, createdAt: 0, updatedAt: 0 })
                .exec();
            resolve({
                errorCode: 0,
                data: pinsData,
                message: "Fetch pins succeed!",
            });
        } catch (error) {
            reject(error);
        }
    });
};
export const fetchAllPinByUserCreateService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                const pinsData = await Pin.find(
                    { userId: String(userId) },
                    { users: 0, createdAt: 0, updatedAt: 0 }
                ).exec();

                resolve({
                    errorCode: 0,
                    data: pinsData,
                    message: "Fetch pins succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const fetchAllPinByUserSaveService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                const pinsData = await Pin.find(
                    { saves: String(userId) },
                    { users: 0, createdAt: 0, updatedAt: 0 }
                ).exec();
                resolve({
                    errorCode: 0,
                    data: pinsData,
                    message: "Fetch pins succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const fetchPinByIdService = (pinId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pinId) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(pinId)) {
                    resolve({
                        errorCode: 2,
                        message: "No pin with that id",
                    });
                }
                const pinsData = await Pin.findById(pinId)
                    .populate([
                        {
                            path: "comments",
                            populate: {
                                path: "user",
                                select: ["image", "userName", "fullName"],
                            },
                        },
                        {
                            path: "users",
                            select: [
                                "image",
                                "userName",
                                "fullName",
                                "follower",
                                "followed",
                            ],
                        },
                    ])
                    .exec();
                resolve({
                    errorCode: 0,
                    data: pinsData,
                    message: "Fetch pins succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const fetchUserBySearchService = (searchQuery) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!searchQuery) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                const text = new RegExp(searchQuery, "i");
                const usersData = await User.find({
                    $or: [{ fullName: text }, { userName: text }],
                })
                    .select(["image", "userName", "fullName"])
                    .exec();

                resolve({
                    errorCode: 0,
                    data: usersData,
                    message: "Fetch users succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const fetchPinBySearchService = (searchQuery, tags) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!searchQuery) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                const text = new RegExp(searchQuery, "i");
                const pinsData = await Pin.find({
                    $or: [
                        { title: text },
                        { about: text },
                        { link: text },
                        { tags: { $in: tags.split(",") } },
                    ],
                });

                resolve({
                    errorCode: 0,
                    data: pinsData,
                    message: "Fetch pins succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const fetchAllCommentPinService = (pinId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pinId) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(pinId)) {
                    resolve({
                        errorCode: 2,
                        message: "No pin with that id",
                    });
                }
                const commentsData = await Comment.find({
                    pin: String(pinId),
                })
                    .populate([
                        {
                            path: "user",
                            select: ["image", "userName", "fullName"],
                        },
                    ])
                    .exec();
                resolve({
                    errorCode: 0,
                    data: commentsData,
                    message: "Fetch comment pin succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const createNewPinService = (data, userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.about || !data.title || !data.image || !userInfo) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                const newPin = new Pin({
                    ...data,
                    userId: userInfo.id,
                    users: userInfo.id,
                });
                // const res = await newPin.save();
                await newPin.save();
                resolve({
                    errorCode: 0,
                    message: "Create new pin succeed!",
                    // data: res,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const updatePinService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.about || !data.title || !data.id) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(data.id)) {
                    resolve({
                        errorCode: 2,
                        message: "No pin with that id",
                    });
                }
                const updatePost = await Pin.findByIdAndUpdate(
                    data.id,
                    {
                        ...data,
                        _id: data.id,
                    },
                    {
                        new: true,
                    }
                );
                resolve({
                    errorCode: 0,
                    message: "Pin updated successfully!",
                    data: updatePost,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const deletePinService = (pinId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pinId) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(pinId)) {
                    resolve({
                        errorCode: 2,
                        message: "No pin with that id",
                    });
                }
                await Pin.findByIdAndDelete(pinId);
                resolve({
                    errorCode: 0,
                    message: "Pin deleted successfully!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const savePinService = (pinId, userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pinId) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(pinId)) {
                    resolve({
                        errorCode: 2,
                        message: "No pin with that id",
                    });
                }
                const pin = await Pin.findById(pinId);
                const index = pin.saves.findIndex(
                    (id) => id === String(userInfo.id)
                );
                if (index === -1) {
                    pin.saves.push(userInfo.id);
                } else {
                    pin.saves = pin.saves.filter(
                        (id) => id !== String(userInfo.id)
                    );
                }

                const updatePin = await Pin.findByIdAndUpdate(pinId, pin, {
                    new: true,
                })
                    .populate("users", {
                        password: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    })
                    .exec();
                resolve({
                    errorCode: 0,
                    message: "Pin update successfully!",
                    data: updatePin,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const commentPinService = (pinId, text, userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!pinId) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(pinId)) {
                    resolve({
                        errorCode: 2,
                        message: "No pin with that id",
                    });
                }
                const comment = new Comment({
                    comment: text,
                    pin: pinId,
                    user: userInfo.id,
                });
                // save comment
                await comment.save();
                // get this particular post
                const pin = await Pin.findById(pinId);
                // push the comment into the post.comments array
                pin.comments.push(comment);

                const updatePin = await Pin.findByIdAndUpdate(pinId, pin, {
                    new: true,
                })
                    .populate("users", {
                        password: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    })
                    .exec();
                const commentsData = await Comment.find({
                    pin: String(pinId),
                })
                    .populate([
                        {
                            path: "user",
                            select: ["image", "userName", "fullName"],
                        },
                    ])
                    .exec();

                resolve({
                    errorCode: 0,
                    message: "Create comment successfully!",
                    data: commentsData,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
export const likeCommentPinService = (commentId, userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!commentId) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(commentId)) {
                    resolve({
                        errorCode: 2,
                        message: "No comment with that id",
                    });
                }

                const comment = await Comment.findById(commentId);
                const index = comment.likes.findIndex(
                    (id) => id === String(userInfo.id)
                );
                if (index === -1) {
                    comment.likes.push(userInfo.id);
                } else {
                    comment.likes = comment.likes.filter(
                        (id) => id !== String(userInfo.id)
                    );
                }

                const updateComment = await Comment.findByIdAndUpdate(
                    commentId,
                    comment,
                    {
                        new: true,
                    }
                )
                    .populate("users", {
                        password: 0,
                        createdAt: 0,
                        updatedAt: 0,
                    })
                    .exec();

                resolve({
                    errorCode: 0,
                    message: "Comment update successfully!",
                    data: updateComment,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

export const deleteCommentPinService = (commentId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!commentId) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(commentId)) {
                    resolve({
                        errorCode: 2,
                        message: "No comment with that id",
                    });
                }
                await Comment.findByIdAndDelete(commentId);
                resolve({
                    errorCode: 0,
                    message: "Comment deleted successfully!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
